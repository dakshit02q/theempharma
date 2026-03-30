import StudentsPage from '@/components/pages/StudentsPage';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/seo';

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

export default function Page() {
    return <StudentsPage />;
}