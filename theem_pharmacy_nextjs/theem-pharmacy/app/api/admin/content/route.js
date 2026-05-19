import { db } from '@/lib/db';
import { pageContentSections } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { getMissingFields } from '@/lib/api/validation';

export async function GET(request) {
  const authResult = requireAuth(request);
  if (!authResult.success) {
    return apiError(authResult.error, { status: 401 });
  }

  try {
    const sections = await db.query.pageContentSections.findMany({
      orderBy: (table, { asc }) => [asc(table.pageSlug), asc(table.order), asc(table.id)],
    });

    return apiSuccess(sections);
  } catch (error) {
    return handleApiError(error, 'Error fetching page content sections:', 'Failed to fetch page content sections');
  }
}

export async function POST(request) {
  const authResult = requireAuth(request);
  if (!authResult.success) {
    return apiError(authResult.error, { status: 401 });
  }

  try {
    const body = await request.json();
    const missingFields = getMissingFields(body, ['pageSlug', 'sectionKey', 'title']);

    if (missingFields.length > 0) {
      return apiError('Missing required fields', {
        status: 400,
        details: { missingFields },
      });
    }

    const order = body.order !== undefined ? Number.parseInt(body.order, 10) : 0;
    if (Number.isNaN(order)) {
      return apiError('Invalid order value', { status: 400 });
    }

    const created = await db.insert(pageContentSections).values({
      pageSlug: body.pageSlug.trim(),
      sectionKey: body.sectionKey.trim(),
      title: body.title.trim(),
      content: body.content || null,
      document: body.document || null,
      order,
      isActive: body.isActive !== false,
    }).returning();

    return apiSuccess(created[0], {
      status: 201,
      message: 'Page content section created successfully',
    });
  } catch (error) {
    return handleApiError(error, 'Error creating page content section:', 'Failed to create page content section');
  }
}
