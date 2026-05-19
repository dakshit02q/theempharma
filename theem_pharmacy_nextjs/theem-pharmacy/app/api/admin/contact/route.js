import { db } from '@/lib/db';
import { contactSubmissions } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseListQuery, applyListQuery } from '@/lib/api/query';

export async function GET(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const query = parseListQuery(request, {
            defaultSortBy: 'submittedAt',
            defaultSortOrder: 'desc',
        });

        const allSubmissions = await db.query.contactSubmissions.findMany({
            orderBy: (table, { desc }) => [desc(table.submittedAt)],
        });

        const { data, meta } = applyListQuery(allSubmissions, query, {
            searchFields: ['name', 'email', 'subject', 'message'],
        });

        return apiSuccess(data, { meta });
    } catch (error) {
        return handleApiError(error, 'Error fetching contact submissions:', 'Failed to fetch contact submissions');
    }
}
