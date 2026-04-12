import { notFound } from 'next/navigation';
import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';

const ALLOWED_SLUGS = ['b-pharmacy', 'd-pharmacy'];

const TITLE_MAP = {
    'b-pharmacy': 'B.Pharmacy',
    'd-pharmacy': 'D.Pharmacy',
};

export async function generateMetadata({ params }) {
    const slug = params.slug;
    return {
        title: `${TITLE_MAP[slug] || 'Admission'} - Theem College of Pharmacy`,
    };
}

export default async function AdmissionsSubPage({ params }) {
    const slug = params.slug;

    if (!ALLOWED_SLUGS.includes(slug)) {
        notFound();
    }

    const data = await getPageContentData(`admissions/${slug}`);

    return (
        <>
            <DynamicContentPage title={data.title} subtitle={data.subtitle} sections={data.sections} />
            <ScrollToTopButton />
        </>
    );
}
