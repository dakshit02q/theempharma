import { and, asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { pageContentSections } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { INSTITUTE_CELL_SLUGS, INSTITUTE_CELL_TITLES, getInstituteCellPageSlug } from '@/lib/content/institute-cells-config';
import { deletePublicFile } from '@/lib/storage/files';

function toOrder(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}

function toSectionKey(slug, title) {
    return title
        ? String(title).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
        : slug;
}

export async function GET(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { slug: rawSlug } = await params;
        const slug = String(rawSlug || '').trim();
        if (!INSTITUTE_CELL_SLUGS.includes(slug)) {
            return apiError('Invalid institute cell slug', { status: 404 });
        }

        const pageSlug = getInstituteCellPageSlug(slug);
        const sections = await db.select().from(pageContentSections)
            .where(eq(pageContentSections.pageSlug, pageSlug))
            .orderBy(asc(pageContentSections.order), asc(pageContentSections.id));

        return apiSuccess({
            slug,
            title: INSTITUTE_CELL_TITLES[slug],
            sections,
        });
    } catch (error) {
        return handleApiError(error, 'Error fetching institute cell admin content:', 'Failed to fetch institute cell admin content');
    }
}

export async function POST(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { slug: rawSlug } = await params;
        const slug = String(rawSlug || '').trim();

        if (!INSTITUTE_CELL_SLUGS.includes(slug)) {
            return apiError('Invalid institute cell slug', { status: 404 });
        }

        const body = await request.json();
        const title = String(body.title || '').trim();
        if (!title) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields: ['title'] },
            });
        }

        const pageSlug = getInstituteCellPageSlug(slug);
        const id = Number.parseInt(body.id, 10);
        const order = toOrder(body.order);
        const sectionKey = toSectionKey(slug, body.sectionKey || title);

        if (id) {
            const existing = await db.query.pageContentSections.findFirst({
                where: (table, { eq }) => eq(table.id, id),
            });

            if (!existing || existing.pageSlug !== pageSlug) {
                return apiError('Content section not found', { status: 404 });
            }

            const updated = await db.update(pageContentSections)
                .set({
                    sectionKey,
                    title,
                    content: body.content || null,
                    document: body.document || null,
                    order,
                    isActive: body.isActive !== false,
                    updatedAt: new Date(),
                })
                .where(and(eq(pageContentSections.id, id), eq(pageContentSections.pageSlug, pageSlug)))
                .returning();

            if (existing.document && existing.document !== body.document) {
                await deletePublicFile(existing.document);
            }

            return apiSuccess(updated[0], {
                message: 'Institute cell content updated successfully',
            });
        }

        const created = await db.insert(pageContentSections).values({
            pageSlug,
            sectionKey,
            title,
            content: body.content || null,
            document: body.document || null,
            order,
            isActive: body.isActive !== false,
        }).returning();

        return apiSuccess(created[0], {
            status: 201,
            message: 'Institute cell content created successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error saving institute cell content:', 'Failed to save institute cell content');
    }
}

export async function DELETE(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { slug: rawSlug } = await params;
        const slug = String(rawSlug || '').trim();

        if (!INSTITUTE_CELL_SLUGS.includes(slug)) {
            return apiError('Invalid institute cell slug', { status: 404 });
        }

        const { searchParams } = new URL(request.url);
        const id = Number.parseInt(searchParams.get('id'), 10);

        if (Number.isNaN(id) || id <= 0) {
            return apiError('Invalid content section id', { status: 400 });
        }

        const pageSlug = getInstituteCellPageSlug(slug);
        const deleted = await db.delete(pageContentSections)
            .where(and(eq(pageContentSections.id, id), eq(pageContentSections.pageSlug, pageSlug)))
            .returning();

        if (deleted.length === 0) {
            return apiError('Content section not found', { status: 404 });
        }

        await deletePublicFile(deleted[0].document);

        return apiSuccess({}, {
            message: 'Institute cell content deleted successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting institute cell content:', 'Failed to delete institute cell content');
    }
}
