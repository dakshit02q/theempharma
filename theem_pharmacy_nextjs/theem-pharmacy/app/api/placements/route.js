import { db } from '@/lib/db';
import { placements } from '@/lib/db/schema';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseListQuery, applyListQuery } from '@/lib/api/query';
import { getMissingFields } from '@/lib/api/validation';

export async function GET(request) {
    try {
        const query = parseListQuery(request, { defaultSortBy: 'placementDate' });
        const allPlacements = await db.query.placements.findMany({
            where: (table, { eq }) => eq(table.isActive, true),
            orderBy: (table, { desc }) => desc(table.placementDate),
        });

        const { data, meta } = applyListQuery(allPlacements, query, {
            searchFields: ['company', 'position', 'location'],
            defaultSortBy: 'placementDate',
        });

        return apiSuccess(data, { meta });
    } catch (error) {
        return handleApiError(error, 'Error fetching placements:', 'Failed to fetch placements');
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const missingFields = getMissingFields(body, ['company']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const parsedStudentId = body.studentId
            ? Number.parseInt(body.studentId, 10)
            : null;

        if (body.studentId && Number.isNaN(parsedStudentId)) {
            return apiError('Invalid studentId', { status: 400 });
        }

        const newPlacement = await db.insert(placements).values({
            studentId: parsedStudentId,
            company: body.company,
            position: body.position,
            package: body.package,
            placementDate: body.placementDate,
            location: body.location,
            isActive: body.isActive !== false
        }).returning();

        return apiSuccess(newPlacement[0], {
            status: 201,
            message: 'Placement created successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error creating placement:', 'Failed to create placement');
    }
}
