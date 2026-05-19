import { db } from '@/lib/db';
import { students } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId, getMissingFields } from '@/lib/api/validation';

export async function PUT(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        if (!id) {
            return apiError('Invalid student id', { status: 400 });
        }

        const body = await request.json();
        const missingFields = getMissingFields(body, ['rollNumber', 'name']);
        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const parsedCourseId = body.courseId ? Number.parseInt(body.courseId, 10) : null;
        const parsedSemester = body.semester ? Number.parseInt(body.semester, 10) : null;
        const parsedAdmissionYear = body.admissionYear ? Number.parseInt(body.admissionYear, 10) : null;

        if (body.courseId && Number.isNaN(parsedCourseId)) {
            return apiError('Invalid courseId', { status: 400 });
        }

        if (body.semester && Number.isNaN(parsedSemester)) {
            return apiError('Invalid semester', { status: 400 });
        }

        if (body.admissionYear && Number.isNaN(parsedAdmissionYear)) {
            return apiError('Invalid admissionYear', { status: 400 });
        }

        const updatedStudent = await db
            .update(students)
            .set({
                rollNumber: body.rollNumber,
                name: body.name,
                courseId: parsedCourseId,
                semester: parsedSemester,
                email: body.email,
                phone: body.phone,
                address: body.address,
                admissionYear: parsedAdmissionYear,
                status: body.status || 'active',
                updatedAt: new Date(),
            })
            .where(eq(students.id, id))
            .returning();

        if (updatedStudent.length === 0) {
            return apiError('Student not found', { status: 404 });
        }

        return apiSuccess(updatedStudent[0], {
            message: 'Student updated successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error updating student:', 'Failed to update student');
    }
}

export async function DELETE(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        if (!id) {
            return apiError('Invalid student id', { status: 400 });
        }

        const deletedStudent = await db
            .delete(students)
            .where(eq(students.id, id))
            .returning();

        if (deletedStudent.length === 0) {
            return apiError('Student not found', { status: 404 });
        }

        return apiSuccess({}, {
            message: 'Student deleted successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting student:', 'Failed to delete student');
    }
}
