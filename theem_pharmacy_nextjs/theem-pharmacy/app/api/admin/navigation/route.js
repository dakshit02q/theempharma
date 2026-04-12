import { db } from '@/lib/db';
import { navigationItems } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { getMissingFields } from '@/lib/api/validation';

export async function GET(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const items = await db.query.navigationItems.findMany({
            orderBy: (table, { asc }) => [asc(table.order), asc(table.id)],
        });

        return apiSuccess(items);
    } catch (error) {
        return handleApiError(error, 'Error fetching navigation items:', 'Failed to fetch navigation items');
    }
}

export async function POST(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const body = await request.json();
        const missingFields = getMissingFields(body, ['label', 'slug']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const order = body.order !== undefined ? Number.parseInt(body.order, 10) : 0;
        if (Number.isNaN(order)) {
            return apiError('Invalid order value', { status: 400 });
        }

        const parentId = body.parentId !== undefined && body.parentId !== null && body.parentId !== ''
            ? Number.parseInt(body.parentId, 10)
            : null;

        if (body.parentId !== undefined && body.parentId !== null && body.parentId !== '' && Number.isNaN(parentId)) {
            return apiError('Invalid parentId value', { status: 400 });
        }

        const created = await db.insert(navigationItems).values({
            label: body.label.trim(),
            slug: body.slug.trim(),
            parentId,
            icon: body.icon || null,
            order,
            isActive: body.isActive !== false,
        }).returning();

        return apiSuccess(created[0], {
            status: 201,
            message: 'Navigation item created successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error creating navigation item:', 'Failed to create navigation item');
    }
}
