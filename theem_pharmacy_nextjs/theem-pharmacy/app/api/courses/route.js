import { db } from '@/lib/db';
import { courses } from '@/lib/db/schema';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseListQuery, applyListQuery } from '@/lib/api/query';
import { getMissingFields } from '@/lib/api/validation';

export async function GET(request) {
    try {
        const query = parseListQuery(request, { defaultSortBy: 'createdAt' });
        const allCourses = await db.query.courses.findMany();
        const { data, meta } = applyListQuery(allCourses, query, {
            searchFields: ['name', 'description', 'duration', 'eligibility'],
            defaultSortBy: 'createdAt',
        });

        return apiSuccess(data, { meta });
    } catch (error) {
        return handleApiError(error, 'Error fetching courses:', 'Failed to fetch courses');
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const missingFields = getMissingFields(body, ['name']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const newCourse = await db
            .insert(courses)
            .values({
                name: body.name,
                description: body.description,
                duration: body.duration,
                eligibility: body.eligibility,
            })
            .returning();

        return apiSuccess(newCourse[0], {
            status: 201,
            message: 'Course created successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error creating course:', 'Failed to create course');
    }
}