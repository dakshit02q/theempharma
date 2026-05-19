import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { approvals } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId, getMissingFields } from '@/lib/api/validation';
import { deletePublicFile } from '@/lib/storage/files';

export async function PUT(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const id = parseId(params.id);
        if (!id) {
            return apiError('Invalid approval id', { status: 400 });
        }

        const body = await request.json();
        const missingFields = getMissingFields(body, ['title']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const existing = await db.query.approvals.findFirst({
            where: (table, { eq }) => eq(table.id, id),
        });

        if (!existing) {
            return apiError('Approval not found', { status: 404 });
        }

        const updated = await db.update(approvals)
            .set({
                title: String(body.title).trim(),
                description: body.description || null,
                approvingBody: body.approvingBody || null,
                approvalDate: body.approvalDate || null,
                validUntil: body.validUntil || null,
                certificateNumber: body.certificateNumber || null,
                document: body.document || null,
                category: body.category || 'academic',
                isActive: body.isActive !== false,
                updatedAt: new Date(),
            })
            .where(eq(approvals.id, id))
            .returning();

        if (existing.document && body.document && existing.document !== body.document) {
            await deletePublicFile(existing.document);
        }

        return apiSuccess(updated[0], {
            message: 'Approval updated successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error updating approval:', 'Failed to update approval');
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
            return apiError('Invalid approval id', { status: 400 });
        }

        const deleted = await db.delete(approvals)
            .where(eq(approvals.id, id))
            .returning();

        if (deleted.length === 0) {
            return apiError('Approval not found', { status: 404 });
        }

        await deletePublicFile(deleted[0].document);

        return apiSuccess({}, {
            message: 'Approval deleted successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting approval:', 'Failed to delete approval');
    }
}
