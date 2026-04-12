import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';

export const metadata = {
    title: 'IIC - Theem College of Pharmacy',
    description: 'Institution Innovation Council information and updates.',
};

export default async function IicPage() {
    const data = await getPageContentData('iic');

    return (
        <>
            <DynamicContentPage title={data.title} subtitle={data.subtitle} sections={data.sections} />
            <ScrollToTopButton />
        </>
    );
}
