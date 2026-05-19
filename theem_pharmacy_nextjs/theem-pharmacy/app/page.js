import HomePage from '@/components/pages/HomePage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getPageContentData } from '@/lib/content/page-content';

// This is a Server Component - it enables SSR
export default async function Home() {
  const homeData = await getPageContentData('home');
  return (
    <>
      <HomePage homeData={homeData} />
      <ScrollToTopButton />
    </>
  )
}
