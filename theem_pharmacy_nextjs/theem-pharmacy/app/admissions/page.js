import AdmissionsPage from '@/components/pages/AdmissionsPage'
import AdmissionsApplicationForm from '@/components/pages/AdmissionsApplicationForm'
import ScrollToTopButton from '@/components/ScrollToTopButton'

export const metadata = {
    title: 'Admissions - Theem College of Pharmacy',
    description: 'Explore admission requirements, programs, and application process for B.Pharm and D.Pharm courses at Theem College of Pharmacy and Research.',
}

// Server Component
export default function Admissions() {
    return (
        <>
            <AdmissionsPage />
            <AdmissionsApplicationForm />
            <ScrollToTopButton />
        </>
    )
}