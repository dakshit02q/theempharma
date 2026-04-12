import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';

export const metadata = {
    title: 'Institute Cells - Theem College of Pharmacy',
    description: 'Institute cell information and student support bodies.',
};

export default async function InstituteCellsPage() {
    const data = await getPageContentData('institute-cells');

    return (
        <>
            <DynamicContentPage title={data.title} subtitle={data.subtitle} sections={data.sections} />
            <ScrollToTopButton />
        </>
    );
}
