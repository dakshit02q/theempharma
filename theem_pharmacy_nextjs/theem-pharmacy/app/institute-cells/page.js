import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
    return {
        title: 'Institute Cells - Theem College of Pharmacy',
        description: 'Institute cell information and student support bodies.',
        openGraph: generateOGMetadata('institute-cells', {
            title: 'Institute Cells - Theem College of Pharmacy',
            description: 'Institute cell information and student support bodies.',
            path: '/institute-cells',
        }),
        twitter: generateTwitterMetadata('institute-cells', {
            title: 'Institute Cells - Theem College of Pharmacy',
            description: 'Institute cell information and student support bodies.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/institute-cells',
        },
    };
}

export default async function InstituteCellsPage() {
    const data = await getPageContentData('institute-cells');

    return (
        <>
            <DynamicContentPage title={data.title} subtitle={data.subtitle} sections={data.sections} />
            <ScrollToTopButton />
        </>
    );
}
