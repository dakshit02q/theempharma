import StudentsPage from '@/components/pages/StudentsPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/seo';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return {
        title: 'Students - Life & Activities | THEEM College of Pharmacy',
        description: 'Explore student life, achievements, activities, and opportunities at THEEM College of Pharmacy.',
        keywords: [
            'student life THEEM',
            'pharmacy students',
            'student activities',
            'student achievements',
            'college events'
        ],
        openGraph: generateOGMetadata('students', {
            title: 'Students - Life & Activities | THEEM College of Pharmacy',
            description: 'Explore student life, achievements, and activities at THEEM College.',
            path: '/students',
        }),
        twitter: generateTwitterMetadata('students', {
            title: 'Students - Life & Activities | THEEM College of Pharmacy',
            description: 'Explore student life, achievements, and activities at THEEM College.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/students',
        },
    };
}

async function getStudentsData() {
    const fallback = {
        studentsData: {
            statistics: {
                totalStudents: 0,
                activeOrganizations: 0,
                eventsPerYear: 0,
                placementRate: 0,
            },
            organizations: [],
            achievements: [],
            events: [],
        },
        isFallback: true,
    };

    try {
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

        const resultData = {
            statistics: {
                totalStudents: allStudents.length,
                activeOrganizations: uniqueCourseCount,
                eventsPerYear: eventsThisYear.length,
                placementRate,
            },
            organizations: [],
            achievements: [],
            events: normalizedEvents,
            students: allStudents,
        };

        return {
            studentsData: resultData,
            isFallback: false,
        };
    } catch (error) {
        console.error('Error fetching students page data:', error);
        return fallback;
    }
}

export default async function Page() {
    const { studentsData, isFallback } = await getStudentsData();

    return (
        <>
            <StudentsPage studentsData={studentsData} isFallback={isFallback} />
            <ScrollToTopButton />
        </>
    );
}