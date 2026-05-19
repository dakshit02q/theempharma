import ResearchPage from '@/components/pages/ResearchPage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { generateOGMetadata, generateTwitterMetadata, generateStructuredData } from '@/lib/seo'
import { db } from '@/lib/db'
import { researchProjects, publications } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
    return {
        title: 'Research & Innovation | THEEM College of Pharmacy',
        description: 'Explore cutting-edge research projects, publications, and state-of-the-art facilities at THEEM College of Pharmacy.',
        openGraph: generateOGMetadata('research', {
            title: 'Research & Innovation | THEEM College of Pharmacy',
            description: 'Explore cutting-edge research projects and state-of-the-art facilities.',
            path: '/research',
        }),
        twitter: generateTwitterMetadata('research', {
            title: 'Research & Innovation | THEEM College of Pharmacy',
            description: 'Explore cutting-edge research projects and state-of-the-art facilities.',
        }),
    }
}

async function getResearchData() {
    try {
        const [projects, pubs] = await Promise.all([
            db.select().from(researchProjects)
                .where(eq(researchProjects.isActive, true))
                .orderBy(desc(researchProjects.startDate)),
            db.select().from(publications)
                .where(eq(publications.isActive, true))
                .orderBy(desc(publications.year)),
        ]);

        const facilities = [
            {
                id: 1,
                name: 'Drug Discovery Lab',
                description: 'Advanced facility for drug design and development research',
                icon: 'fas fa-pills',
                equipment: ['HPLC Systems', 'Mass Spectrometers', 'NMR Facility', 'Cell Culture Units']
            },
            {
                id: 2,
                name: 'Nanotechnology Center',
                description: 'Specialized center for nanoparticle research and characterization',
                icon: 'fas fa-atom',
                equipment: ['Electron Microscopy', 'Particle Size Analyzer', 'Zeta Potential Analyzer']
            }
        ];

        return { 
            researchProjects: projects.map(p => ({
                ...p,
                funding: p.amount ? `₹${Number(p.amount).toLocaleString()} (${p.fundingAgency})` : p.fundingAgency,
                duration: `${p.startDate ? new Date(p.startDate).getFullYear() : ''} - ${p.endDate ? new Date(p.endDate).getFullYear() : 'Present'}`
            })), 
            publications: pubs, 
            facilities 
        };
    } catch (error) {
        console.error('Error fetching research data:', error);
        return { researchProjects: [], publications: [], facilities: [] };
    }
}

export default async function Research() {
    const researchData = await getResearchData()
    const structuredData = generateStructuredData('organization')

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <ResearchPage
                researchProjects={researchData.researchProjects}
                publications={researchData.publications}
                facilities={researchData.facilities}
            />
            <ScrollToTopButton />
        </>
    )
}