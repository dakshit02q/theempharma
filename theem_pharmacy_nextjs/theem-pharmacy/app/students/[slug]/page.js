import { notFound } from 'next/navigation';
import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';

export const dynamic = 'force-dynamic';

const ALLOWED_SLUGS = ['syllabus', 'library', 'resources'];

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const titleMap = {
        syllabus: 'Academic Syllabus',
        library: 'Library & Information Center',
        resources: 'Student Resources',
    };
    
    return {
        title: `${titleMap[slug] || 'Students Corner'} - Theem College of Pharmacy`,
    };
}

export default async function StudentSubPage({ params }) {
    const { slug } = await params;

    if (!ALLOWED_SLUGS.includes(slug)) {
        notFound();
    }

    const data = await getPageContentData(`students/${slug}`);

    return (
        <>
            <DynamicContentPage 
                key={slug} 
                title={data.title} 
                subtitle={data.subtitle} 
                sections={data.sections} 
            />
            <ScrollToTopButton />
        </>
    );
}
