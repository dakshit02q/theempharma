import { db } from '@/lib/db';
import { faculty } from '@/lib/db/schema';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseListQuery, applyListQuery } from '@/lib/api/query';
import { getMissingFields } from '@/lib/api/validation';

export async function GET(request) {
  try {
    const query = parseListQuery(request, { defaultSortBy: 'createdAt' });
    const allFaculty = await db.query.faculty.findMany();
    const { data, meta } = applyListQuery(allFaculty, query, {
      searchFields: ['name', 'position', 'specialization', 'email'],
      defaultSortBy: 'createdAt',
    });

    return apiSuccess(data, { meta });
  } catch (error) {
    return handleApiError(error, 'Error fetching faculty:', 'Failed to fetch faculty');
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const missingFields = getMissingFields(body, ['name', 'position']);

    if (missingFields.length > 0) {
      return apiError('Missing required fields', {
        status: 400,
        details: { missingFields },
      });
    }

    const newFacultyMember = await db
      .insert(faculty)
      .values({
        name: body.name,
        position: body.position,
        specialization: body.specialization,
        email: body.email,
        phone: body.phone,
        bio: body.bio,
        image: body.image,
      })
      .returning();

    return apiSuccess(newFacultyMember[0], {
      status: 201,
      message: 'Faculty member created successfully',
    });
  } catch (error) {
    return handleApiError(error, 'Error creating faculty member:', 'Failed to create faculty member');
  }
}
