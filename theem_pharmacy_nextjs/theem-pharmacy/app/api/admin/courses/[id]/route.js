import { db } from '@/lib/db';
import { courses } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId, getMissingFields } from '@/lib/api/validation';

// Update course
export async function PUT(request, { params }) {
    // Check authentication
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        const body = await request.json();

        if (!id) {
            return apiError('Invalid course id', { status: 400 });
        }

        const missingFields = getMissingFields(body, ['name']);
        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const updatedCourse = await db
            .update(courses)
            .set({
                name: body.name,
                description: body.description,
                duration: body.duration,
                eligibility: body.eligibility,
                updatedAt: new Date()
            })
            .where(eq(courses.id, id))
            .returning();

        if (updatedCourse.length === 0) {
            return apiError('Course not found', { status: 404 });
        }

        return apiSuccess(updatedCourse[0], { message: 'Course updated successfully' });
    } catch (error) {
        return handleApiError(error, 'Error updating course:', 'Failed to update course');
    }
}

// Delete course
export async function DELETE(request, { params }) {
    // Check authentication
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);

        if (!id) {
            return apiError('Invalid course id', { status: 400 });
        }

        const deletedCourse = await db
            .delete(courses)
            .where(eq(courses.id, id))
            .returning();

        if (deletedCourse.length === 0) {
            return apiError('Course not found', { status: 404 });
        }

        return apiSuccess({}, {
            message: 'Course deleted successfully'
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting course:', 'Failed to delete course');
    }
}
