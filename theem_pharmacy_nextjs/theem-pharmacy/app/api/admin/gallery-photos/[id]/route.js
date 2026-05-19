import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { galleryPhotos } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId, getMissingFields } from '@/lib/api/validation';
import { deletePublicFile } from '@/lib/storage/files';

function toOrder(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}

export async function PUT(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const id = parseId(params.id);
        if (!id) {
            return apiError('Invalid gallery photo id', { status: 400 });
        }

        const body = await request.json();
        const missingFields = getMissingFields(body, ['title', 'image']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const existing = await db.query.galleryPhotos.findFirst({
            where: (table, { eq }) => eq(table.id, id),
        });

        if (!existing) {
            return apiError('Gallery photo not found', { status: 404 });
        }

        const updated = await db.update(galleryPhotos)
            .set({
                title: String(body.title).trim(),
                caption: body.caption || null,
                image: String(body.image).trim(),
                order: toOrder(body.order),
                isActive: body.isActive !== false,
                updatedAt: new Date(),
            })
            .where(eq(galleryPhotos.id, id))
            .returning();

        if (existing.image && existing.image !== body.image) {
            await deletePublicFile(existing.image);
        }

        return apiSuccess(updated[0], {
            message: 'Gallery photo updated successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error updating gallery photo:', 'Failed to update gallery photo');
    }
}

export async function DELETE(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const id = parseId(params.id);
        if (!id) {
            return apiError('Invalid gallery photo id', { status: 400 });
        }

        const deleted = await db.delete(galleryPhotos)
            .where(eq(galleryPhotos.id, id))
            .returning();

        if (deleted.length === 0) {
            return apiError('Gallery photo not found', { status: 404 });
        }

        await deletePublicFile(deleted[0].image);

        return apiSuccess({}, {
            message: 'Gallery photo deleted successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting gallery photo:', 'Failed to delete gallery photo');
    }
}
