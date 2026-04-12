import { db } from '@/lib/db';
import { aboutContent } from '@/lib/db/schema';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { getMissingFields } from '@/lib/api/validation';

export async function GET() {
  try {
    const content = await db.query.aboutContent.findMany({
      where: (table, { eq }) => eq(table.isActive, true),
      orderBy: (table, { asc }) => asc(table.order),
    });

    return apiSuccess(content);
  } catch (error) {
    return handleApiError(error, 'Error fetching about content:', 'Failed to fetch about content');
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const missingFields = getMissingFields(body, ['title', 'content']);

    if (missingFields.length > 0) {
      return apiError('Missing required fields', {
        status: 400,
        details: { missingFields },
      });
    }

    const newContent = await db.insert(aboutContent).values(body).returning();
    return apiSuccess(newContent[0], {
      status: 201,
      message: 'About content created successfully',
    });
  } catch (error) {
    return handleApiError(error, 'Error creating about content:', 'Failed to create about content');
  }
}
