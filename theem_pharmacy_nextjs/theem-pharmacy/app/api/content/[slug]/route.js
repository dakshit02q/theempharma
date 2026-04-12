import { db } from '@/lib/db';
import { pageContentSections } from '@/lib/db/schema';
import { apiSuccess, handleApiError } from '@/lib/api/response';

export async function GET(_request, { params }) {
    try {
        const slug = String(params.slug || '').trim();

        const sections = await db.query.pageContentSections.findMany({
            where: (table, { and, eq }) => and(
                eq(table.pageSlug, slug),
                eq(table.isActive, true)
            ),
            orderBy: (table, { asc }) => [asc(table.order), asc(table.id)],
        });

        return apiSuccess(sections);
    } catch (error) {
        return handleApiError(error, 'Error fetching content sections:', 'Failed to fetch content');
    }
}
