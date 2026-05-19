import { db } from '@/lib/db';
import { pageContentSections } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId } from '@/lib/api/validation';
import { deletePublicFile } from '@/lib/storage/files';

export async function PUT(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        if (!id) {
            return apiError('Invalid content section id', { status: 400 });
        }

        const body = await request.json();
        const updates = { updatedAt: new Date() };

        const existing = await db.query.pageContentSections.findFirst({
            where: (table, { eq }) => eq(table.id, id),
        });

        if (!existing) {
            return apiError('Content section not found', { status: 404 });
        }

        if (body.pageSlug !== undefined) {
            updates.pageSlug = String(body.pageSlug).trim();
        }

        if (body.sectionKey !== undefined) {
            updates.sectionKey = String(body.sectionKey).trim();
        }

        if (body.title !== undefined) {
            updates.title = String(body.title).trim();
        }

        if (body.content !== undefined) {
            updates.content = body.content || null;
        }

        if (body.document !== undefined) {
            updates.document = body.document || null;
        }

        if (body.order !== undefined) {
            const parsedOrder = Number.parseInt(body.order, 10);
            if (Number.isNaN(parsedOrder)) {
                return apiError('Invalid order value', { status: 400 });
            }
            updates.order = parsedOrder;
        }

        if (body.isActive !== undefined) {
            updates.isActive = Boolean(body.isActive);
        }

        const updated = await db.update(pageContentSections)
            .set(updates)
            .where(eq(pageContentSections.id, id))
            .returning();

        if (body.document !== undefined && existing.document && existing.document !== body.document) {
            await deletePublicFile(existing.document);
        }

        return apiSuccess(updated[0], {
            message: 'Page content section updated successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error updating page content section:', 'Failed to update page content section');
    }
}

export async function DELETE(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        if (!id) {
            return apiError('Invalid content section id', { status: 400 });
        }

        const deleted = await db.delete(pageContentSections)
            .where(eq(pageContentSections.id, id))
            .returning();

        if (deleted.length === 0) {
            return apiError('Content section not found', { status: 404 });
        }

        await deletePublicFile(deleted[0].document);

        return apiSuccess({}, {
            message: 'Page content section deleted successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting page content section:', 'Failed to delete page content section');
    }
}
