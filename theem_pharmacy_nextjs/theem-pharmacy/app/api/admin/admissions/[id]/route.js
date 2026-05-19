import { db } from '@/lib/db';
import { admissions } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId, getMissingFields } from '@/lib/api/validation';

// Update admission status
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
            return apiError('Invalid admission id', { status: 400 });
        }

        const updateData = {};
        const fields = [
            'firstName', 'lastName', 'email', 'phone', 'courseId', 
            'qualifications', 'experienceYears', 'status'
        ];

        fields.forEach(field => {
            if (body[field] !== undefined) {
                updateData[field] = body[field];
            }
        });

        if (Object.keys(updateData).length === 0) {
            return apiError('No data provided for update', { status: 400 });
        }

        if (updateData.status) {
            const allowedStatuses = ['pending', 'approved', 'rejected'];
            if (!allowedStatuses.includes(updateData.status)) {
                return apiError('Invalid status value', {
                    status: 400,
                    details: { allowedStatuses },
                });
            }
        }

        const updatedAdmission = await db
            .update(admissions)
            .set({
                ...updateData,
                updatedAt: new Date()
            })
            .where(eq(admissions.id, id))
            .returning();

        if (updatedAdmission.length === 0) {
            return apiError('Admission not found', { status: 404 });
        }

        return apiSuccess(updatedAdmission[0]);
    } catch (error) {
        return handleApiError(error, 'Error updating admission:', 'Failed to update admission');
    }
}

// Delete admission
export async function DELETE(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);

        if (!id) {
            return apiError('Invalid admission id', { status: 400 });
        }

        const deletedAdmission = await db
            .delete(admissions)
            .where(eq(admissions.id, id))
            .returning();

        if (deletedAdmission.length === 0) {
            return apiError('Admission not found', { status: 404 });
        }

        return apiSuccess({}, { message: 'Admission deleted successfully' });
    } catch (error) {
        return handleApiError(error, 'Error deleting admission:', 'Failed to delete admission');
    }
}
