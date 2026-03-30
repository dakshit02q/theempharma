import ResearchPage from '@/components/pages/ResearchPage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { generateOGMetadata, generateTwitterMetadata, generateStructuredData } from '@/lib/seo'

export async function generateMetadata() {
    return {
        title: 'Research & Innovation | THEEM College of Pharmacy - Advanced Pharmaceutical Research',
        description: 'Explore cutting-edge research projects, publications, and state-of-the-art facilities at THEEM College of Pharmacy. Leading pharmaceutical innovation and scientific discovery.',
        keywords: [
            'pharmaceutical research',
            'drug development',
            'research facilities',
            'scientific publications',
            'innovation in pharmacy',
            'research projects',
            'pharmaceutical sciences',
            'laboratory research'
        ],
        openGraph: generateOGMetadata('research', {
            title: 'Research & Innovation | THEEM College of Pharmacy',
            description: 'Explore cutting-edge research projects and state-of-the-art facilities.',
            path: '/research',
        }),
        twitter: generateTwitterMetadata('research', {
            title: 'Research & Innovation | THEEM College of Pharmacy',
            description: 'Explore cutting-edge research projects and state-of-the-art facilities.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/research',
        },
    }
}

async function getResearchData() {
    return {
        researchProjects: [
            {
                id: 1,
                title: 'Novel Drug Delivery Systems for Cancer Treatment',
                description: 'Development of targeted nanoparticle-based drug delivery systems for enhanced cancer therapy with reduced side effects.',
                principalInvestigator: 'Dr. Meena Sharma',
                funding: '₹15,00,000 (DST Grant)',
                duration: '2023-2026',
                status: 'Ongoing'
            },
            {
                id: 2,
                title: 'Antimicrobial Resistance in Hospital Settings',
                description: 'Comprehensive study on antibiotic resistance patterns and development of novel antimicrobial compounds.',
                principalInvestigator: 'Dr. Rajesh Kumar',
                funding: '₹12,00,000 (ICMR Grant)',
                duration: '2022-2025',
                status: 'Ongoing'
            }
        ],
        publications: [
            {
                id: 1,
                title: 'Advanced Nanotechnology in Drug Delivery: Recent Developments and Future Prospects',
                authors: 'Dr. Meena Sharma, Dr. Priya Joshi, Dr. Amit Patel',
                journal: 'International Journal of Pharmaceutics',
                year: '2024',
                impactFactor: '5.8'
            },
            {
                id: 2,
                title: 'Pharmaceutical Analysis of Herbal Medicines: Quality Control and Standardization',
                authors: 'Dr. Rajesh Kumar, Dr. Anita Desai',
                journal: 'Journal of Pharmaceutical and Biomedical Analysis',
                year: '2023',
                impactFactor: '4.2'
            }
        ],
        facilities: [
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
        ]
    }
}

// Server Component with data fetching
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