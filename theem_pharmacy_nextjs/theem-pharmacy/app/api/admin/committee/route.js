import { db } from '@/lib/db';
import { committee } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { getMissingFields } from '@/lib/api/validation';
import { parseListQuery, applyListQuery } from '@/lib/api/query';

export async function GET(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const query = parseListQuery(request, {
            defaultSortBy: 'order',
            defaultSortOrder: 'asc',
        });

        const allMembers = await db.query.committee.findMany({
            orderBy: (table, { asc, desc }) => [asc(table.order), desc(table.createdAt)],
        });

        const { data, meta } = applyListQuery(allMembers, query, {
            searchFields: ['name', 'position', 'department'],
        });

        return apiSuccess(data, { meta });
    } catch (error) {
        return handleApiError(error, 'Error fetching committee members:', 'Failed to fetch committee members');
    }
}

export async function POST(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const body = await request.json();
        const missingFields = getMissingFields(body, ['name', 'position']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const newMember = await db.insert(committee).values({
            name: body.name.trim(),
            position: body.position.trim(),
            department: body.department?.trim() || null,
            email: body.email?.trim() || null,
            phone: body.phone?.trim() || null,
            bio: body.bio?.trim() || null,
            image: body.image || null,
            order: Number.parseInt(body.order, 10) || 0,
            isActive: body.isActive !== false,
        }).returning();

        return apiSuccess(newMember[0], { status: 201 });
    } catch (error) {
        return handleApiError(error, 'Error creating committee member:', 'Failed to create committee member');
    }
}
