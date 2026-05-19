import { and, asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { pageContentSections } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { deletePublicFile } from '@/lib/storage/files';

function toOrder(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}

function toSectionKey(title) {
    return title
        ? String(title).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
        : 'section-' + Date.now();
}

export async function GET(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) return apiError(authResult.error, { status: 401 });

    try {
        const { category, slug } = await params;
        const pageSlug = `${category}/${slug}`;
        
        const sections = await db.select().from(pageContentSections)
            .where(eq(pageContentSections.pageSlug, pageSlug))
            .orderBy(asc(pageContentSections.order), asc(pageContentSections.id));

        return apiSuccess({
            category,
            slug,
            pageSlug,
            sections,
        });
    } catch (error) {
        return handleApiError(error, 'Error fetching dynamic admin content');
    }
}

export async function POST(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) return apiError(authResult.error, { status: 401 });

    try {
        const { category, slug } = await params;
        const pageSlug = `${category}/${slug}`;
        const body = await request.json();
        
        const title = String(body.title || '').trim();
        if (!title) return apiError('Title is required', { status: 400 });

        const id = Number.parseInt(body.id, 10);
        const order = toOrder(body.order);
        const sectionKey = body.sectionKey || toSectionKey(title);

        if (id) {
            const existing = await db.query.pageContentSections.findFirst({
                where: (table, { eq }) => eq(table.id, id),
            });

            if (!existing || existing.pageSlug !== pageSlug) {
                return apiError('Section not found', { status: 404 });
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

            return apiSuccess(updated[0], { message: 'Section updated' });
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

        return apiSuccess(created[0], { status: 201, message: 'Section created' });
    } catch (error) {
        return handleApiError(error, 'Error saving dynamic content');
    }
}

export async function DELETE(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) return apiError(authResult.error, { status: 401 });

    try {
        const { category, slug } = await params;
        const pageSlug = `${category}/${slug}`;
        const { searchParams } = new URL(request.url);
        const id = Number.parseInt(searchParams.get('id'), 10);

        if (!id) return apiError('ID required', { status: 400 });

        const deleted = await db.delete(pageContentSections)
            .where(and(eq(pageContentSections.id, id), eq(pageContentSections.pageSlug, pageSlug)))
            .returning();

        if (deleted.length === 0) return apiError('Section not found', { status: 404 });
        if (deleted[0].document) await deletePublicFile(deleted[0].document);

        return apiSuccess({}, { message: 'Section deleted' });
    } catch (error) {
        return handleApiError(error, 'Error deleting content');
    }
}
