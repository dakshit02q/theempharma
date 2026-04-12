import { db } from '@/lib/db';
import { navigationItems } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId } from '@/lib/api/validation';

export async function PUT(request, { params }) {
  const authResult = requireAuth(request);
  if (!authResult.success) {
    return apiError(authResult.error, { status: 401 });
  }

  try {
    const id = parseId(params.id);
    if (!id) {
      return apiError('Invalid navigation item id', { status: 400 });
    }

    const body = await request.json();
    const updates = { updatedAt: new Date() };

    if (body.label !== undefined) {
      updates.label = String(body.label).trim();
    }

    if (body.slug !== undefined) {
      updates.slug = String(body.slug).trim();
    }

    if (body.icon !== undefined) {
      updates.icon = body.icon || null;
    }

    if (body.parentId !== undefined) {
      if (body.parentId === null || body.parentId === '') {
        updates.parentId = null;
      } else {
        const parentId = Number.parseInt(body.parentId, 10);
        if (Number.isNaN(parentId)) {
          return apiError('Invalid parentId value', { status: 400 });
        }
        updates.parentId = parentId;
      }
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

    const updated = await db.update(navigationItems)
      .set(updates)
      .where(eq(navigationItems.id, id))
      .returning();

    if (updated.length === 0) {
      return apiError('Navigation item not found', { status: 404 });
    }

    return apiSuccess(updated[0], {
      message: 'Navigation item updated successfully',
    });
  } catch (error) {
    return handleApiError(error, 'Error updating navigation item:', 'Failed to update navigation item');
  }
}

export async function DELETE(request, { params }) {
  const authResult = requireAuth(request);
  if (!authResult.success) {
    return apiError(authResult.error, { status: 401 });
  }

  try {
    const id = parseId(params.id);
    if (!id) {
      return apiError('Invalid navigation item id', { status: 400 });
    }

    const deleted = await db.delete(navigationItems)
      .where(eq(navigationItems.id, id))
      .returning();

    if (deleted.length === 0) {
      return apiError('Navigation item not found', { status: 404 });
    }

    return apiSuccess({}, {
      message: 'Navigation item deleted successfully',
    });
  } catch (error) {
    return handleApiError(error, 'Error deleting navigation item:', 'Failed to delete navigation item');
  }
}
