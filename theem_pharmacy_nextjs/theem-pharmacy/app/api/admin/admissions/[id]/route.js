import { db } from '@/lib/db';
import { admissions } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId, getMissingFields } from '@/lib/api/validation';

// Update admission status
export async function PUT(request, { params }) {
    // Check authentication
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const id = parseId(params.id);
        const body = await request.json();

        if (!id) {
            return apiError('Invalid admission id', { status: 400 });
        }

        const missingFields = getMissingFields(body, ['status']);
        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const allowedStatuses = ['pending', 'approved', 'rejected'];
        if (!allowedStatuses.includes(body.status)) {
            return apiError('Invalid status value', {
                status: 400,
                details: { allowedStatuses },
            });
        }

        const updatedAdmission = await db
            .update(admissions)
            .set({
                status: body.status,
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
