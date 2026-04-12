import { notFound } from 'next/navigation';
import DynamicContentPage from '@/components/pages/DynamicContentPage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getPageContentData } from '@/lib/content/page-content';

const ALLOWED_SLUGS = ['exam-cell', 'anti-ragging-committee', 'student-grievance-cell'];

const TITLE_MAP = {
    'exam-cell': 'Exam Cell',
    'anti-ragging-committee': 'Anti Ragging Committee',
    'student-grievance-cell': 'Student Grievance Cell',
};

export async function generateMetadata({ params }) {
    const slug = params.slug;
    return {
        title: `${TITLE_MAP[slug] || 'Institute Cell'} - Theem College of Pharmacy`,
    };
}

export default async function InstituteCellSubPage({ params }) {
    const slug = params.slug;

    if (!ALLOWED_SLUGS.includes(slug)) {
        notFound();
    }

    const data = await getPageContentData(`institute-cells/${slug}`);

    return (
        <>
            <DynamicContentPage title={data.title} subtitle={data.subtitle} sections={data.sections} />
            <ScrollToTopButton />
        </>
    );
}
