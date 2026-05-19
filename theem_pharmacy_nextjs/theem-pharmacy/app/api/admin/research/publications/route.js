import { db } from '@/lib/db';
import { publications } from '@/lib/db/schema';
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
            defaultSortBy: 'year',
            defaultSortOrder: 'desc',
        });

        const allPublications = await db.query.publications.findMany({
            orderBy: (table, { desc }) => [desc(table.year), desc(table.createdAt)],
        });

        const { data, meta } = applyListQuery(allPublications, query, {
            searchFields: ['title', 'authors', 'journal'],
        });

        return apiSuccess(data, { meta });
    } catch (error) {
        return handleApiError(error, 'Error fetching publications:', 'Failed to fetch publications');
    }
}

export async function POST(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const body = await request.json();
        const missingFields = getMissingFields(body, ['title']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const newPublication = await db.insert(publications).values({
            title: body.title.trim(),
            authors: body.authors?.trim() || null,
            journal: body.journal?.trim() || null,
            year: Number.parseInt(body.year, 10) || null,
            volume: body.volume?.trim() || null,
            pages: body.pages?.trim() || null,
            doi: body.doi?.trim() || null,
            impactFactor: body.impactFactor || null,
            isActive: body.isActive !== false,
        }).returning();

        return apiSuccess(newPublication[0], { status: 201 });
    } catch (error) {
        return handleApiError(error, 'Error creating publication:', 'Failed to create publication');
    }
}
