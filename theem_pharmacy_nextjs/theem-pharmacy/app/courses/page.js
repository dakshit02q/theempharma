import CoursesPage from '@/components/pages/CoursesPage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getAllCourses } from '@/lib/data'
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/seo'

export async function generateMetadata() {
    const metadata = {
        title: 'Pharmacy Courses - B.Pharm, M.Pharm, Pharm.D Programs | THEEM College',
        description: 'Explore pharmacy programs at THEEM College: 4-year B.Pharmacy, 2-year M.Pharmacy, 6-year Pharm.D courses. Modern curriculum, expert faculty, excellent placement records. Admission open 2024.',
        keywords: [
            'B.Pharmacy course',
            'M.Pharmacy program',
            'Pharm.D degree',
            'pharmacy courses Maharashtra',
            'pharmaceutical education programs',
            'pharmacy admission requirements',
            'pharmacy course duration',
            'pharmacy degree eligibility',
            'pharmaceutical sciences courses',
            'clinical pharmacy program'
        ],
        openGraph: generateOGMetadata('courses', {
            title: 'Pharmacy Courses - B.Pharm, M.Pharm, Pharm.D Programs',
            description: 'Explore pharmacy programs at THEEM College with modern curriculum and expert faculty.',
            path: '/courses',
        }),
        twitter: generateTwitterMetadata('courses', {
            title: 'Pharmacy Courses - B.Pharm, M.Pharm, Pharm.D Programs',
            description: 'Explore pharmacy programs at THEEM College with modern curriculum and expert faculty.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/courses',
        },
    }

    return metadata
}

// Server Component with data fetching
export default async function Courses() {
    // Fetch courses from database
    const courses = await getAllCourses()

    // Fallback data if database is empty
    const defaultCourses = [
        {
            id: 1,
            name: 'B.Pharmacy',
            description:
                'A comprehensive 4-year undergraduate program in pharmacy designed to provide students with in-depth knowledge of pharmaceutical sciences, clinical practice, and healthcare management.',
            duration: '4 years',
            eligibility: '10+2 with Science (Physics, Chemistry, Biology/Math)',
            highlights: [
                'Comprehensive theoretical knowledge',
                'Hands-on practical training',
                'Industry internships',
                'Research opportunities',
                'Career-focused curriculum',
            ],
        },
        {
            id: 2,
            name: 'M.Pharmacy',
            description:
                'A 2-year advanced degree program for pharmacy graduates seeking specialized knowledge and research expertise in pharmaceutical sciences.',
            duration: '2 years',
            eligibility: 'Bachelor in Pharmacy',
            highlights: [
                'Advanced specialization',
                'Research-focused curriculum',
                'Publication opportunities',
                'Expert mentorship',
                'Industry collaborations',
            ],
        },
        {
            id: 3,
            name: 'Pharm.D',
            description:
                'Doctor of Pharmacy - A comprehensive 6-year professional doctorate program preparing students for clinical pharmacy practice and pharmaceutical care.',
            duration: '6 years',
            eligibility: '10+2 with Science',
            highlights: [
                'Clinical pharmacy focus',
                'Patient care training',
                'Experiential learning',
                'Internship placements',
                'Professional certification',
            ],
        },
    ]

    // Use database courses if available, otherwise use defaults
    const displayCourses = courses.length > 0 ? courses : defaultCourses

    return (
        <>
            <CoursesPage courses={displayCourses} />
            <ScrollToTopButton />
        </>
    )
}
