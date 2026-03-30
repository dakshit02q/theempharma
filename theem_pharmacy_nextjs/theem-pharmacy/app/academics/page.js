import AcademicsPage from '@/components/pages/AcademicsPage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { generateOGMetadata, generateTwitterMetadata, generateStructuredData } from '@/lib/seo'

export async function generateMetadata() {
    return {
        title: 'Academics - Calendar & Syllabus | THEEM College of Pharmacy',
        description: 'Access academic calendar, course syllabus, examination schedules, and academic resources at THEEM College of Pharmacy. Stay updated with all academic activities and important dates.',
        keywords: [
            'THEEM academic calendar',
            'pharmacy syllabus',
            'examination schedule',
            'academic resources',
            'course curriculum',
            'semester dates',
            'academic activities',
            'college calendar'
        ],
        openGraph: generateOGMetadata('academics', {
            title: 'Academics - Calendar & Syllabus | THEEM College of Pharmacy',
            description: 'Access academic calendar, course syllabus, and examination schedules.',
            path: '/academics',
        }),
        twitter: generateTwitterMetadata('academics', {
            title: 'Academics - Calendar & Syllabus | THEEM College of Pharmacy',
            description: 'Access academic calendar, course syllabus, and examination schedules.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/academics',
        },
    }
}

async function getAcademicData() {
    return {
        academicCalendar: [
            {
                id: 1,
                title: 'Semester I Start',
                date: '2024-06-15',
                category: 'semester',
                description: 'First semester classes begin for all courses'
            },
            {
                id: 2,
                title: 'Orientation Program',
                date: '2024-06-20',
                category: 'event',
                description: 'Orientation for new students and parents'
            },
            {
                id: 3,
                title: 'Mid-Semester Examinations',
                date: '2024-08-15',
                category: 'exam',
                description: 'Mid-term examinations for all programs'
            },
            {
                id: 4,
                title: 'Semester I End',
                date: '2024-11-30',
                category: 'semester',
                description: 'End of first semester classes'
            },
            {
                id: 5,
                title: 'Final Examinations',
                date: '2024-12-05',
                category: 'exam',
                description: 'Final examinations for semester I'
            },
            {
                id: 6,
                title: 'Semester II Start',
                date: '2025-01-10',
                category: 'semester',
                description: 'Second semester classes begin'
            }
        ]
    }
}

// Server Component with data fetching
export default async function Academics() {
    const academicData = await getAcademicData()
    const structuredData = generateStructuredData('organization')

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <AcademicsPage academicCalendar={academicData.academicCalendar} />
            <ScrollToTopButton />
        </>
    )
}