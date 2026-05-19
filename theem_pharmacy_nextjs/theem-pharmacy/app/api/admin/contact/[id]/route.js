import { db } from '@/lib/db';
import { contactSubmissions } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId } from '@/lib/api/validation';

export async function PUT(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        const body = await request.json();

        if (!id) {
            return apiError('Invalid submission id', { status: 400 });
        }

        const updateData = {};
        if (body.status !== undefined) {
            updateData.status = body.status;
        }

        // We don't allow editing the original message content for audit integrity
        // but we could add internal notes if needed.
        
        if (Object.keys(updateData).length === 0) {
            return apiError('No data provided for update', { status: 400 });
        }

        const updatedSubmission = await db
            .update(contactSubmissions)
            .set(updateData)
            .where(eq(contactSubmissions.id, id))
            .returning();

        if (updatedSubmission.length === 0) {
            return apiError('Submission not found', { status: 404 });
        }

        return apiSuccess(updatedSubmission[0]);
    } catch (error) {
        return handleApiError(error, 'Error updating contact submission:', 'Failed to update contact submission');
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
            return apiError('Invalid submission id', { status: 400 });
        }

        const deletedSubmission = await db
            .delete(contactSubmissions)
            .where(eq(contactSubmissions.id, id))
            .returning();

        if (deletedSubmission.length === 0) {
            return apiError('Submission not found', { status: 404 });
        }

        return apiSuccess({}, { message: 'Submission deleted successfully' });
    } catch (error) {
        return handleApiError(error, 'Error deleting contact submission:', 'Failed to delete contact submission');
    }
}
