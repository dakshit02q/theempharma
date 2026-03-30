import CommitteePage from '@/components/pages/CommitteePage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { generateOGMetadata, generateTwitterMetadata, generateStructuredData } from '@/lib/seo'

export async function generateMetadata() {
    return {
        title: 'Committee & Governance | THEEM College of Pharmacy - Leadership Structure',
        description: 'Meet our distinguished committee members and governance structure at THEEM College of Pharmacy. Our experienced leadership ensures quality education and institutional excellence.',
        keywords: [
            'THEEM committee members',
            'pharmacy college governance',
            'college leadership team',
            'institutional structure',
            'management committee',
            'academic council',
            'college administration'
        ],
        openGraph: generateOGMetadata('committee', {
            title: 'Committee & Governance | THEEM College of Pharmacy',
            description: 'Meet our distinguished committee members and governance structure.',
            path: '/committee',
        }),
        twitter: generateTwitterMetadata('committee', {
            title: 'Committee & Governance | THEEM College of Pharmacy',
            description: 'Meet our distinguished committee members and governance structure.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/committee',
        },
    }
}

async function getCommitteeData() {
    return [
        {
            id: 1,
            name: 'Dr. Rajesh Sharma',
            position: 'Chairman',
            department: 'Pharmaceutical Sciences',
            email: 'chairman@theem.edu',
            phone: '+91 9876543210',
            bio: 'Leading pharmaceutical researcher with over 20 years of experience in drug development and regulatory affairs.',
            image: '/images/committee/chairman.jpg'
        },
        {
            id: 2,
            name: 'Prof. Meena Patel',
            position: 'Vice Chairman',
            department: 'Clinical Pharmacy',
            email: 'vicechairman@theem.edu',
            phone: '+91 9876543211',
            bio: 'Expert in clinical pharmacy practice with extensive experience in hospital pharmacy management.',
            image: '/images/committee/vice-chairman.jpg'
        },
        {
            id: 3,
            name: 'Dr. Amit Kumar',
            position: 'Academic Secretary',
            department: 'Pharmaceutical Chemistry',
            email: 'secretary@theem.edu',
            phone: '+91 9876543212',
            bio: 'Specializes in medicinal chemistry and pharmaceutical analysis with numerous publications.',
            image: '/images/committee/secretary.jpg'
        },
        {
            id: 4,
            name: 'Dr. Priya Singh',
            position: 'Research Coordinator',
            department: 'Pharmacology',
            email: 'research@theem.edu',
            phone: '+91 9876543213',
            bio: 'Leading researcher in pharmacology with focus on drug safety and toxicology studies.',
            image: '/images/committee/coordinator.jpg'
        }
    ]
}

// Server Component with data fetching
export default async function Committee() {
    const committeeMembers = await getCommitteeData()
    const structuredData = generateStructuredData('organization')

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <CommitteePage committeeMembers={committeeMembers} />
            <ScrollToTopButton />
        </>
    )
}