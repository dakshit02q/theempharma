import PlacementPage from '@/components/pages/PlacementPage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { generateOGMetadata, generateTwitterMetadata, generateStructuredData } from '@/lib/seo'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

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
    const fallbackStatistics = {
        placementRate: 95,
        averagePackage: 450000,
        topPackage: 1200000,
        recruitingCompanies: 85
    }

    const toNumeric = (value) => {
        const parsed = Number(value)
        return Number.isFinite(parsed) ? parsed : null
    }

    const getStatFromLabel = (stats, matcher) => {
        const match = stats.find((stat) => matcher(String(stat.label || '').toLowerCase()))
        return match ? toNumeric(match.value) : null
    }

    try {
        const [placements, dynamicStatistics, allStudents] = await Promise.all([
            db.query.placements.findMany({
                where: (table, { eq }) => eq(table.isActive, true),
                orderBy: (table, { desc }) => desc(table.placementDate),
            }),
            db.query.statistics.findMany({
                where: (table, { eq }) => eq(table.isActive, true),
                orderBy: (table, { asc }) => asc(table.order),
            }),
            db.query.students.findMany({
                where: (table, { eq }) => eq(table.status, 'active'),
            }),
        ])

        const studentStats = {
            placementRate: allStudents.length > 0
                ? Math.round((placements.length / allStudents.length) * 100)
                : 0,
        }

        const packages = placements
            .map((placement) => toNumeric(placement.package))
            .filter((value) => value !== null)

        const uniqueCompanies = new Set(
            placements
                .map((placement) => placement.company)
                .filter((company) => typeof company === 'string' && company.trim() !== '')
        )

        const averagePackageFromPlacements = packages.length > 0
            ? Math.round(packages.reduce((sum, value) => sum + value, 0) / packages.length)
            : null
        const topPackageFromPlacements = packages.length > 0
            ? Math.max(...packages)
            : null

        return {
            statistics: {
                placementRate:
                    toNumeric(studentStats.placementRate) ||
                    getStatFromLabel(dynamicStatistics, (label) => label.includes('placement')) ||
                    fallbackStatistics.placementRate,
                averagePackage:
                    averagePackageFromPlacements ||
                    getStatFromLabel(dynamicStatistics, (label) => label.includes('average package')) ||
                    fallbackStatistics.averagePackage,
                topPackage:
                    topPackageFromPlacements ||
                    getStatFromLabel(dynamicStatistics, (label) => label.includes('top package') || label.includes('highest package')) ||
                    fallbackStatistics.topPackage,
                recruitingCompanies:
                    uniqueCompanies.size ||
                    getStatFromLabel(dynamicStatistics, (label) => label.includes('recruiting') || label.includes('companies')) ||
                    fallbackStatistics.recruitingCompanies,
            }
        }
    } catch (error) {
        console.error('Error fetching placement data:', error)
        return {
            statistics: fallbackStatistics
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