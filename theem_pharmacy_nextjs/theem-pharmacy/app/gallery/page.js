import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';

export const metadata = {
    title: 'Gallary - Theem College of Pharmacy',
    description: 'Gallary highlights and moments from Theem College of Pharmacy and Research.',
};

export default async function GalleryPage() {
    const data = await getPageContentData('gallery');

    return (
        <>
            <DynamicContentPage title={data.title} subtitle={data.subtitle} sections={data.sections} />
            <ScrollToTopButton />
        </>
    );
}
