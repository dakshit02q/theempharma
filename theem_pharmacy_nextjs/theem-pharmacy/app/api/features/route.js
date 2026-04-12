import { db } from '@/lib/db';
import { features } from '@/lib/db/schema';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { getMissingFields } from '@/lib/api/validation';

export async function GET() {
  try {
    const allFeatures = await db.query.features.findMany({
      where: (table, { eq }) => eq(table.isActive, true),
      orderBy: (table, { asc }) => asc(table.order),
    });
    return apiSuccess(allFeatures);
  } catch (error) {
    return handleApiError(error, 'Error fetching features:', 'Failed to fetch features');
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const missingFields = getMissingFields(body, ['title']);

    if (missingFields.length > 0) {
      return apiError('Missing required fields', {
        status: 400,
        details: { missingFields },
      });
    }

    const newFeature = await db.insert(features).values(body).returning();
    return apiSuccess(newFeature[0], {
      status: 201,
      message: 'Feature created successfully',
    });
  } catch (error) {
    return handleApiError(error, 'Error creating feature:', 'Failed to create feature');
  }
}
