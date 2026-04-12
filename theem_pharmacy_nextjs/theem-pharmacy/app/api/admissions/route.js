import { db } from '@/lib/db';
import { admissions } from '@/lib/db/schema';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseListQuery, applyListQuery } from '@/lib/api/query';
import { getMissingFields } from '@/lib/api/validation';

export async function GET(request) {
  try {
    const query = parseListQuery(request, { defaultSortBy: 'submittedAt' });
    const allAdmissions = await db.query.admissions.findMany();

    const { data, meta } = applyListQuery(allAdmissions, query, {
      searchFields: ['firstName', 'lastName', 'email', 'phone'],
      defaultSortBy: 'submittedAt',
    });

    return apiSuccess(data, { meta });
  } catch (error) {
    return handleApiError(error, 'Error fetching admissions:', 'Failed to fetch admissions');
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const missingFields = getMissingFields(body, ['firstName', 'lastName', 'email', 'phone']);

    if (missingFields.length > 0) {
      return apiError('Missing required fields', {
        status: 400,
        details: { missingFields },
      });
    }

    const parsedCourseId = body.courseId
      ? Number.parseInt(body.courseId, 10)
      : null;
    const parsedExperienceYears = body.experienceYears
      ? Number.parseInt(body.experienceYears, 10)
      : null;

    if (body.courseId && Number.isNaN(parsedCourseId)) {
      return apiError('Invalid courseId', { status: 400 });
    }

    if (body.experienceYears && Number.isNaN(parsedExperienceYears)) {
      return apiError('Invalid experienceYears', { status: 400 });
    }

    const newAdmission = await db
      .insert(admissions)
      .values({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        courseId: parsedCourseId,
        qualifications: body.qualifications,
        experienceYears: parsedExperienceYears,
        status: body.status || 'pending',
      })
      .returning();

    return apiSuccess(newAdmission[0], {
      status: 201,
      message: 'Admission created successfully',
    });
  } catch (error) {
    return handleApiError(error, 'Error creating admission:', 'Failed to create admission');
  }
}
