import { notFound } from 'next/navigation';
import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';

export const dynamic = 'force-dynamic';

const ALLOWED_SLUGS = ['b-pharmacy', 'd-pharmacy'];

const TITLE_MAP = {
    'b-pharmacy': 'B.Pharmacy',
    'd-pharmacy': 'D.Pharmacy',
};

export async function generateMetadata({ params }) {
    const { slug } = await params;
    return {
        title: `${TITLE_MAP[slug] || 'Admission'} - Theem College of Pharmacy`,
    };
}

export default async function AdmissionsSubPage({ params }) {
    const { slug } = await params;

    if (!ALLOWED_SLUGS.includes(slug)) {
        notFound();
    }

    const data = await getPageContentData(`admissions/${slug}`);

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
