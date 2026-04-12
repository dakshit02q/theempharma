import { db } from '@/lib/db';
import { statistics } from '@/lib/db/schema';
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
        const id = parseId(params.id);
        if (!id) {
            return apiError('Invalid statistic id', { status: 400 });
        }

        const body = await request.json();
        const missingFields = getMissingFields(body, ['label', 'value']);
        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const parsedValue = parseOptionalInt(body.value);
        if (parsedValue === null) {
            return apiError('Invalid value', { status: 400 });
        }

        const parsedOrder = parseOptionalInt(body.order);
        if (body.order !== undefined && body.order !== null && body.order !== '' && parsedOrder === null) {
            return apiError('Invalid order value', { status: 400 });
        }

        const updatedStatistic = await db
            .update(statistics)
            .set({
                label: body.label,
                value: parsedValue,
                icon: body.icon,
                order: parsedOrder,
                isActive: body.isActive !== false,
                updatedAt: new Date(),
            })
            .where(eq(statistics.id, id))
            .returning();

        if (updatedStatistic.length === 0) {
            return apiError('Statistic not found', { status: 404 });
        }

        return apiSuccess(updatedStatistic[0], {
            message: 'Statistic updated successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error updating statistic:', 'Failed to update statistic');
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
            return apiError('Invalid statistic id', { status: 400 });
        }

        const deletedStatistic = await db
            .delete(statistics)
            .where(eq(statistics.id, id))
            .returning();

        if (deletedStatistic.length === 0) {
            return apiError('Statistic not found', { status: 404 });
        }

        return apiSuccess({}, {
            message: 'Statistic deleted successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting statistic:', 'Failed to delete statistic');
    }
}