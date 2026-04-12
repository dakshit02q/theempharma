import { db } from '@/lib/db';
import { students } from '@/lib/db/schema';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseListQuery, applyListQuery } from '@/lib/api/query';
import { getMissingFields } from '@/lib/api/validation';

export async function GET(request) {
    try {
        const query = parseListQuery(request, { defaultSortBy: 'createdAt' });

        const [allStudents, allEvents, allPlacements] = await Promise.all([
            db.query.students.findMany({
                where: (table, { eq }) => eq(table.status, 'active'),
                orderBy: (table, { desc }) => desc(table.createdAt),
            }),
            db.query.events.findMany({
                where: (table, { eq }) => eq(table.isActive, true),
                orderBy: (table, { desc }) => desc(table.eventDate),
            }),
            db.query.placements.findMany({
                where: (table, { eq }) => eq(table.isActive, true),
            }),
        ]);

        const { data: filteredStudents, meta } = applyListQuery(allStudents, query, {
            searchFields: ['rollNumber', 'name', 'email', 'phone'],
            defaultSortBy: 'createdAt',
        });

        const uniqueCourseCount = new Set(
            allStudents
                .map((student) => student.courseId)
                .filter((courseId) => courseId !== null && courseId !== undefined)
        ).size;

        const currentYear = new Date().getFullYear();
        const eventsThisYear = allEvents.filter((event) => {
            if (!event.eventDate) {
                return false;
            }

            const eventYear = new Date(event.eventDate).getFullYear();
            return eventYear === currentYear;
        });

        const placementRate = allStudents.length > 0
            ? Math.round((allPlacements.length / allStudents.length) * 100)
            : 0;

        const normalizedEvents = allEvents.slice(0, 6).map((event) => ({
            id: event.id,
            title: event.title,
            date: event.eventDate,
            type: event.category || 'general',
            description: event.description || '',
        }));

        const statistics = {
            totalStudents: allStudents.length,
            activeOrganizations: uniqueCourseCount,
            eventsPerYear: eventsThisYear.length,
            placementRate,
        };

        return apiSuccess(
            {
                statistics,
                organizations: [],
                achievements: [],
                events: normalizedEvents,
                students: filteredStudents,
            },
            { meta }
        );
    } catch (error) {
        return handleApiError(error, 'Error fetching students data:', 'Failed to fetch students data');
    }
}

export async function POST(request) {
    try {
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

        const newStudent = await db.insert(students).values({
            rollNumber: body.rollNumber,
            name: body.name,
            courseId: parsedCourseId,
            semester: parsedSemester,
            email: body.email,
            phone: body.phone,
            address: body.address,
            admissionYear: parsedAdmissionYear,
            status: body.status || 'active'
        }).returning();

        return apiSuccess(newStudent[0], {
            status: 201,
            message: 'Student created successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error creating student:', 'Failed to create student');
    }
}
