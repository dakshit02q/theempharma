import AlumniPage from '@/components/pages/AlumniPage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { generateOGMetadata, generateTwitterMetadata, generateStructuredData } from '@/lib/seo'

export async function generateMetadata() {
    return {
        title: 'Alumni Network | THEEM College of Pharmacy - 1250+ Proud Alumni',
        description: 'Join our strong alumni network of 1250+ pharmacy professionals. Connect with graduates working in leading pharmaceutical companies worldwide.',
        keywords: [
            'THEEM alumni',
            'pharmacy alumni network',
            'pharmaceutical professionals',
            'alumni achievements',
            'industry leaders',
            'alumni testimonials',
            'networking opportunities',
            'graduate success stories'
        ],
        openGraph: generateOGMetadata('alumni', {
            title: 'Alumni Network | THEEM College of Pharmacy',
            description: 'Join our strong alumni network of 1250+ pharmacy professionals.',
            path: '/alumni',
        }),
        twitter: generateTwitterMetadata('alumni', {
            title: 'Alumni Network | THEEM College of Pharmacy',
            description: 'Join our strong alumni network of 1250+ pharmacy professionals.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/alumni',
        },
    }
}

async function getAlumniData() {
    return {
        statistics: {
            totalAlumni: 1250,
            industryLeaders: 45,
            entrepreneurs: 28,
            researchers: 67,
            higherEducation: 156,
            internationalPositions: 89
        }
    }
}

// Server Component with data fetching
export default async function Alumni() {
    const alumniData = await getAlumniData()
    const structuredData = generateStructuredData('organization')

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <AlumniPage statistics={alumniData.statistics} />
            <ScrollToTopButton />
        </>
    )
}