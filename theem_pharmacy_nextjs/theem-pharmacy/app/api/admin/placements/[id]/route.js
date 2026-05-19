import { db } from '@/lib/db';
import { placements } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId, getMissingFields } from '@/lib/api/validation';

function parseOptionalInt(value) {
    if (value === undefined || value === null || value === '') {
        return null;
    }

    const parsed = Number.parseInt(String(value), 10);
    return Number.isNaN(parsed) ? null : parsed;
}

export async function PUT(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        if (!id) {
            return apiError('Invalid placement id', { status: 400 });
        }

        const body = await request.json();
        const missingFields = getMissingFields(body, ['company']);
        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const parsedStudentId = parseOptionalInt(body.studentId);
        if (body.studentId && parsedStudentId === null) {
            return apiError('Invalid studentId', { status: 400 });
        }

        const updatedPlacement = await db
            .update(placements)
            .set({
                studentId: parsedStudentId,
                company: body.company,
                position: body.position,
                package: body.package,
                placementDate: body.placementDate,
                location: body.location,
                isActive: body.isActive !== false,
                updatedAt: new Date(),
            })
            .where(eq(placements.id, id))
            .returning();

        if (updatedPlacement.length === 0) {
            return apiError('Placement not found', { status: 404 });
        }

        return apiSuccess(updatedPlacement[0], {
            message: 'Placement updated successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error updating placement:', 'Failed to update placement');
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
            return apiError('Invalid placement id', { status: 400 });
        }

        const deletedPlacement = await db
            .delete(placements)
            .where(eq(placements.id, id))
            .returning();

        if (deletedPlacement.length === 0) {
            return apiError('Placement not found', { status: 404 });
        }

        return apiSuccess({}, {
            message: 'Placement deleted successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting placement:', 'Failed to delete placement');
    }
}
