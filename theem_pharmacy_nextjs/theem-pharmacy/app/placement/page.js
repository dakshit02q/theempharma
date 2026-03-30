import PlacementPage from '@/components/pages/PlacementPage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { generateOGMetadata, generateTwitterMetadata, generateStructuredData } from '@/lib/seo'

export async function generateMetadata() {
    return {
        title: 'Placement & Career Services | THEEM College of Pharmacy - 95% Placement Record',
        description: 'Excellent placement opportunities at THEEM College with 95% placement record. Top pharmaceutical companies recruit our graduates. Career guidance and placement support.',
        keywords: [
            'pharmacy placement',
            'pharmaceutical jobs',
            'career opportunities',
            'placement record',
            'pharma companies recruitment',
            'career services',
            'job placement',
            'industry partnerships'
        ],
        openGraph: generateOGMetadata('placement', {
            title: 'Placement & Career Services | THEEM College of Pharmacy',
            description: 'Excellent placement opportunities with 95% placement record.',
            path: '/placement',
        }),
        twitter: generateTwitterMetadata('placement', {
            title: 'Placement & Career Services | THEEM College of Pharmacy',
            description: 'Excellent placement opportunities with 95% placement record.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/placement',
        },
    }
}

async function getPlacementData() {
    return {
        statistics: {
            placementRate: 95,
            averagePackage: 450000,
            topPackage: 1200000,
            recruitingCompanies: 85
        }
    }
}

// Server Component with data fetching
export default async function Placement() {
    const placementData = await getPlacementData()
    const structuredData = generateStructuredData('organization')

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <PlacementPage statistics={placementData.statistics} />
            <ScrollToTopButton />
        </>
    )
}