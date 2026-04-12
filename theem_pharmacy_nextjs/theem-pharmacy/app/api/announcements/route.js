import { db } from '@/lib/db';
import { announcements } from '@/lib/db/schema';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseListQuery, applyListQuery } from '@/lib/api/query';
import { getMissingFields } from '@/lib/api/validation';

export async function GET(request) {
    try {
        const query = parseListQuery(request, {
            defaultSortBy: 'priority',
            defaultSortOrder: 'desc',
            defaultLimit: 20,
        });

        const now = new Date();
        const activeAnnouncements = await db.query.announcements.findMany({
            where: (table, { and, eq, isNull, lte, gte, or }) =>
                and(
                    eq(table.isActive, true),
                    or(isNull(table.startsAt), lte(table.startsAt, now)),
                    or(isNull(table.endsAt), gte(table.endsAt, now))
                ),
            orderBy: (table, { desc }) => [desc(table.priority), desc(table.createdAt)],
        });

        const { data, meta } = applyListQuery(activeAnnouncements, query, {
            searchFields: ['title', 'message'],
            defaultSortBy: 'priority',
        });

        return apiSuccess(data, { meta });
    } catch (error) {
        return handleApiError(error, 'Error fetching announcements:', 'Failed to fetch announcements');
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const missingFields = getMissingFields(body, ['title', 'message']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const parsedPriority = body.priority !== undefined
            ? Number.parseInt(body.priority, 10)
            : 0;

        if (Number.isNaN(parsedPriority)) {
            return apiError('Invalid priority', { status: 400 });
        }

        const newAnnouncement = await db.insert(announcements).values({
            title: body.title.trim(),
            message: body.message.trim(),
            priority: parsedPriority,
            isActive: body.isActive !== false,
            startsAt: body.startsAt || null,
            endsAt: body.endsAt || null,
        }).returning();

        return apiSuccess(newAnnouncement[0], {
            status: 201,
            message: 'Announcement created successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error creating announcement:', 'Failed to create announcement');
    }
}
