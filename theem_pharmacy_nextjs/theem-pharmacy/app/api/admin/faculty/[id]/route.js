import { db } from '@/lib/db';
import { faculty } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId, getMissingFields } from '@/lib/api/validation';
import { deletePublicFile } from '@/lib/storage/files';

export async function PUT(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        if (!id) {
            return apiError('Invalid faculty id', { status: 400 });
        }

        const body = await request.json();
        const missingFields = getMissingFields(body, ['name', 'position']);
        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const updatedFaculty = await db
            .update(faculty)
            .set({
                name: body.name,
                position: body.position,
                specialization: body.specialization,
                email: body.email,
                phone: body.phone,
                bio: body.bio,
                image: body.image,
                updatedAt: new Date(),
            })
            .where(eq(faculty.id, id))
            .returning();

        if (updatedFaculty.length === 0) {
            return apiError('Faculty member not found', { status: 404 });
        }

        return apiSuccess(updatedFaculty[0], {
            message: 'Faculty member updated successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error updating faculty member:', 'Failed to update faculty member');
    }
}

export async function DELETE(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        if (!id) {
            return apiError('Invalid faculty id', { status: 400 });
        }

        const deletedFaculty = await db
            .delete(faculty)
            .where(eq(faculty.id, id))
            .returning();

        if (deletedFaculty.length === 0) {
            return apiError('Faculty member not found', { status: 404 });
        }

        // remove uploaded image if present
        if (deletedFaculty[0]?.image) {
            await deletePublicFile(deletedFaculty[0].image);
        }

        return apiSuccess({}, {
            message: 'Faculty member deleted successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting faculty member:', 'Failed to delete faculty member');
    }
}
