import { db } from '@/lib/db/index.js';
import { statistics } from '@/lib/db/schema.js';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { getMissingFields } from '@/lib/api/validation';

export async function GET() {
  try {
    const allStats = await db.query.statistics.findMany({
      where: (table, { eq }) => eq(table.isActive, true),
      orderBy: (table, { asc }) => asc(table.order),
    });
    return apiSuccess(allStats);
  } catch (error) {
    return handleApiError(error, 'Error fetching statistics:', 'Failed to fetch statistics');
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const missingFields = getMissingFields(body, ['label', 'value']);

    if (missingFields.length > 0) {
      return apiError('Missing required fields', {
        status: 400,
        details: { missingFields },
      });
    }

    const newStat = await db.insert(statistics).values(body).returning();
    return apiSuccess(newStat[0], {
      status: 201,
      message: 'Statistic created successfully',
    });
  } catch (error) {
    return handleApiError(error, 'Error creating statistic:', 'Failed to create statistic');
  }
}
