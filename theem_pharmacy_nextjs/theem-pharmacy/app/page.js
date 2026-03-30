import HomePage from '@/components/pages/HomePage'
import ScrollToTopButton from '@/components/ScrollToTopButton'

// This is a Server Component - it enables SSR
export default function Home() {
  return (
    <>
      <HomePage />
      <ScrollToTopButton />
    </>
  )
}
