import AboutPage from '@/components/pages/AboutPage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getPageContentData } from '@/lib/content/page-content'
import { db } from '@/lib/db'
import { eq, asc } from 'drizzle-orm'
import { committee } from '@/lib/db/schema'

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'About Us - Theem College of Pharmacy',
    description: 'Learn about Theem College of Pharmacy and Research - our mission, vision, leadership team, and commitment to pharmaceutical education excellence.',
}

async function getAboutData() {
    try {
        const [contentData, committeeMembers] = await Promise.all([
            getPageContentData('about'),
            db.query.committee.findMany({
                where: (table) => eq(table.isActive, true),
                orderBy: (table) => [asc(table.order), asc(table.id)],
            })
        ]);

        return {
            content: contentData.sections || [],
            committee: committeeMembers || []
        };
    } catch (error) {
        console.error('Error fetching about data:', error);
        return { content: [], committee: [] };
    }
}

export default async function About() {
    const { content, committee } = await getAboutData();

    return (
        <>
            <AboutPage initialContent={content} initialCommittee={committee} />
            <ScrollToTopButton />
        </>
    )
}