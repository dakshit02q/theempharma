import { notFound } from 'next/navigation';
import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';

export const dynamic = 'force-dynamic';

const SLUG_ALIAS_MAP = {
    'b-pharmacy': 'b-pharmacy',
    'b-pharma': 'b-pharmacy',
    'd-pharmacy': 'd-pharmacy',
    'd-pharma': 'd-pharmacy',
};

const ALLOWED_SLUGS = Object.keys(SLUG_ALIAS_MAP);

const TITLE_MAP = {
    'b-pharmacy': 'B.Pharm',
    'd-pharmacy': 'D.Pharm',
};

export async function generateMetadata({ params }) {
    const { slug: rawSlug } = await params;
    const slug = SLUG_ALIAS_MAP[rawSlug] || rawSlug;
    return {
        title: `${TITLE_MAP[slug] || 'Academics'} - Theem College of Pharmacy`,
    };
}

export default async function AcademicsSubPage({ params }) {
    const { slug: rawSlug } = await params;
    const slug = rawSlug;

    if (!ALLOWED_SLUGS.includes(slug)) {
        notFound();
    }

    const canonicalSlug = SLUG_ALIAS_MAP[slug];
    const data = await getPageContentData(`academics/${canonicalSlug}`);

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
