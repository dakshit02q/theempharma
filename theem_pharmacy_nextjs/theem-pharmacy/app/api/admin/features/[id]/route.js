import { db } from '@/lib/db';
import { features } from '@/lib/db/schema';
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
            return apiError('Invalid feature id', { status: 400 });
        }

        const body = await request.json();
        const missingFields = getMissingFields(body, ['title']);
        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const parsedOrder = parseOptionalInt(body.order);
        if (body.order !== undefined && body.order !== null && body.order !== '' && parsedOrder === null) {
            return apiError('Invalid order value', { status: 400 });
        }

        const updatedFeature = await db
            .update(features)
            .set({
                title: body.title,
                description: body.description,
                icon: body.icon,
                order: parsedOrder,
                isActive: body.isActive !== false,
                updatedAt: new Date(),
            })
            .where(eq(features.id, id))
            .returning();

        if (updatedFeature.length === 0) {
            return apiError('Feature not found', { status: 404 });
        }

        return apiSuccess(updatedFeature[0], {
            message: 'Feature updated successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error updating feature:', 'Failed to update feature');
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
            return apiError('Invalid feature id', { status: 400 });
        }

        const deletedFeature = await db
            .delete(features)
            .where(eq(features.id, id))
            .returning();

        if (deletedFeature.length === 0) {
            return apiError('Feature not found', { status: 404 });
        }

        return apiSuccess({}, {
            message: 'Feature deleted successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting feature:', 'Failed to delete feature');
    }
}