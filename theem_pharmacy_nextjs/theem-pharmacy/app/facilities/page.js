import FacilitiesPage from '@/components/pages/FacilitiesPage'

export const metadata = {
    title: 'Laboratory Facilities | Theem College of Pharmacy',
    description: 'Explore our state-of-the-art laboratory facilities including Pharmaceutics, Pharmacology, Pharmacognosy, Pharmaceutical Chemistry, Microbiology, and more. Equipped with the latest technology for hands-on pharmaceutical education.',
    keywords: 'pharmacy laboratories, pharmaceutical facilities, pharmaceutics lab, pharmacology lab, pharmacognosy lab, pharmaceutical chemistry, microbiology lab, pharmacy education, Theem College facilities',
    openGraph: {
        title: 'Laboratory Facilities | Theem College of Pharmacy',
        description: 'State-of-the-art laboratories with the latest equipment for comprehensive pharmaceutical education and research.',
        type: 'website',
    }
}

export default function Facilities() {
    return <FacilitiesPage />
}
