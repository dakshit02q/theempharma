import { notFound } from 'next/navigation';
import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';

export const dynamic = 'force-dynamic';

const ALLOWED_SLUGS = ['about', 'team'];

export async function generateMetadata({ params }) {
    const { slug } = await params;
    return {
        title: `${slug === 'about' ? 'About IIC' : 'IIC Team'} - Theem College of Pharmacy`,
    };
}

export default async function IicSubPage({ params }) {
    const { slug } = await params;

    if (!ALLOWED_SLUGS.includes(slug)) {
        notFound();
    }

    const data = await getPageContentData(`iic/${slug}`);

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
