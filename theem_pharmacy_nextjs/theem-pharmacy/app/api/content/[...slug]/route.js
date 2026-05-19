import { db } from '@/lib/db';
import { pageContentSections } from '@/lib/db/schema';
import { apiSuccess, handleApiError } from '@/lib/api/response';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(_request, { params }) {
    try {
        const { slug: slugParam } = await params;
        // Join slug array if it's a catch-all route
        const slug = Array.isArray(slugParam) ? slugParam.join('/') : String(slugParam || '').trim();

        if (!slug) {
            return apiSuccess([]);
        }

        const sections = await db.query.pageContentSections.findMany({
            where: (table, { and, eq }) => and(
                eq(table.pageSlug, slug),
                eq(table.isActive, true)
            ),
            orderBy: (table, { asc }) => [asc(table.order), asc(table.id)],
        });

        const response = apiSuccess(sections);
        response.headers.set('Cache-Control', 'no-store, max-age=0');
        return response;
    } catch (error) {
        return handleApiError(error, 'Error fetching content sections:', 'Failed to fetch content');
    }
}
