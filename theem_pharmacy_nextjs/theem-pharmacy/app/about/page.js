import AboutPage from '@/components/pages/AboutPage'
import ScrollToTopButton from '@/components/ScrollToTopButton'

export const metadata = {
    title: 'About Us - Theem College of Pharmacy',
    description: 'Learn about Theem College of Pharmacy and Research - our mission, vision, leadership team, and commitment to pharmaceutical education excellence.',
}

// This is a Server Component - it enables SSR
export default function About() {
    return (
        <>
            <AboutPage />
            <ScrollToTopButton />
        </>
    )
}