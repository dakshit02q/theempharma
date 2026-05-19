import { notFound } from 'next/navigation';
import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/seo';
import { INSTITUTE_CELL_SLUGS, INSTITUTE_CELL_TITLES } from '@/lib/content/institute-cells-config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const cellTitle = INSTITUTE_CELL_TITLES[slug] || 'Institute Cell';

    return {
        title: `${cellTitle} - Theem College of Pharmacy`,
        description: `${cellTitle} details, responsibilities, and official notices at Theem College of Pharmacy.`,
        openGraph: generateOGMetadata('institute-cells', {
            title: `${cellTitle} - Theem College of Pharmacy`,
            description: `${cellTitle} details, responsibilities, and official notices at Theem College of Pharmacy.`,
            path: `/institute-cells/${slug}`,
        }),
        twitter: generateTwitterMetadata('institute-cells', {
            title: `${cellTitle} - Theem College of Pharmacy`,
            description: `${cellTitle} details, responsibilities, and official notices at Theem College of Pharmacy.`,
        }),
        alternates: {
            canonical: `https://theempharmacy.edu/institute-cells/${slug}`,
        },
    };
}

export default async function InstituteCellSubPage({ params }) {
    const { slug } = await params;

    if (!INSTITUTE_CELL_SLUGS.includes(slug)) {
        notFound();
    }

    const data = await getPageContentData(`institute-cells/${slug}`);

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
