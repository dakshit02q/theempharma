import { and, asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { pageContentSections } from '@/lib/db/schema';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { INSTITUTE_CELL_SLUGS, INSTITUTE_CELL_TITLES, getInstituteCellPageSlug } from '@/lib/content/institute-cells-config';

export async function GET(_request, { params }) {
    try {
        const { slug: rawSlug } = await params;
        const slug = String(rawSlug || '').trim();

        if (!INSTITUTE_CELL_SLUGS.includes(slug)) {
            return apiError('Invalid institute cell slug', { status: 404 });
        }

        const pageSlug = getInstituteCellPageSlug(slug);
        const sections = await db.select().from(pageContentSections)
            .where(and(
                eq(pageContentSections.pageSlug, pageSlug),
                eq(pageContentSections.isActive, true)
            ))
            .orderBy(asc(pageContentSections.order), asc(pageContentSections.id));

        return apiSuccess({
            slug,
            title: INSTITUTE_CELL_TITLES[slug],
            sections,
        });
    } catch (error) {
        return handleApiError(error, 'Error fetching institute cell content:', 'Failed to fetch institute cell content');
    }
}
