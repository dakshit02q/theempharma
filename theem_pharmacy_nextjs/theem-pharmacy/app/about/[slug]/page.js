import { notFound } from 'next/navigation';
import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';

const ALLOWED_SLUGS = [
    'vision',
    'mission',
    'quality-policy',
    'core-values',
    'board-of-governance',
    'messages',
    'administrative-team',
    'code-of-conduct',
];

const TITLE_MAP = {
    vision: 'Vision',
    mission: 'Mission',
    'quality-policy': 'Quality Policy',
    'core-values': 'Core Values',
    'board-of-governance': 'Board of Governance',
    messages: 'Messages',
    'administrative-team': 'Administrative Team',
    'code-of-conduct': 'Code Of Conduct',
};

export async function generateMetadata({ params }) {
    const slug = params.slug;
    return {
        title: `${TITLE_MAP[slug] || 'About Us'} - Theem College of Pharmacy`,
    };
}

export default async function AboutSubPage({ params }) {
    const slug = params.slug;

    if (!ALLOWED_SLUGS.includes(slug)) {
        notFound();
    }

    const data = await getPageContentData(`about/${slug}`);

    return (
        <>
            <DynamicContentPage title={data.title} subtitle={data.subtitle} sections={data.sections} />
            <ScrollToTopButton />
        </>
    );
}
