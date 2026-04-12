import { and, asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { pageContentSections } from '@/lib/db/schema';

const DEFAULT_PAGE_CONTENT = {
    gallery: {
        title: 'Gallary',
        subtitle: 'Highlights and moments from the institute.',
        sections: [
            {
                sectionKey: 'overview',
                title: 'Gallary Overview',
                content: 'Media and event snapshots will be published here.',
            },
        ],
    },
    iic: {
        title: 'IIC',
        subtitle: 'Institution Innovation Council initiatives and updates.',
        sections: [
            {
                sectionKey: 'overview',
                title: 'About IIC',
                content: 'IIC details and objectives will be managed from the backend content module.',
            },
        ],
    },
    'iic/about': {
        title: 'About IIC',
        sections: [{ sectionKey: 'overview', title: 'About IIC', content: 'Content will be updated from the backend.' }],
    },
    'iic/team': {
        title: 'IIC Team',
        sections: [{ sectionKey: 'team', title: 'IIC Team', content: 'Team details will be updated from the backend.' }],
    },
    'about/vision': {
        title: 'Vision',
        sections: [{ sectionKey: 'vision', title: 'Vision', content: 'Vision content will be updated from the backend.' }],
    },
    'about/mission': {
        title: 'Mission',
        sections: [{ sectionKey: 'mission', title: 'Mission', content: 'Mission content will be updated from the backend.' }],
    },
    'about/quality-policy': {
        title: 'Quality Policy',
        sections: [{ sectionKey: 'quality-policy', title: 'Quality Policy', content: 'Quality policy content will be updated from the backend.' }],
    },
    'about/core-values': {
        title: 'Core Values',
        sections: [{ sectionKey: 'core-values', title: 'Core Values', content: 'Core values content will be updated from the backend.' }],
    },
    'about/board-of-governance': {
        title: 'Board of Governance',
        sections: [{ sectionKey: 'board', title: 'Board of Governance', content: 'Board details will be updated from the backend.' }],
    },
    'about/messages': {
        title: 'Messages',
        sections: [{ sectionKey: 'messages', title: 'Messages', content: 'Institutional messages will be updated from the backend.' }],
    },
    'about/administrative-team': {
        title: 'Administrative Team',
        sections: [{ sectionKey: 'team', title: 'Administrative Team', content: 'Administrative team details will be updated from the backend.' }],
    },
    'about/code-of-conduct': {
        title: 'Code Of Conduct',
        sections: [{ sectionKey: 'code-of-conduct', title: 'Code Of Conduct', content: 'Code of conduct details will be updated from the backend.' }],
    },
    'admissions/b-pharmacy': {
        title: 'B.Pharmacy',
        sections: [{ sectionKey: 'program', title: 'B.Pharmacy', content: 'Program details will be updated from the backend.' }],
    },
    'admissions/d-pharmacy': {
        title: 'D.Pharmacy',
        sections: [{ sectionKey: 'program', title: 'D.Pharmacy', content: 'Program details will be updated from the backend.' }],
    },
    'institute-cells': {
        title: 'Institute Cells',
        subtitle: 'Key institutional cells and committees.',
        sections: [{ sectionKey: 'overview', title: 'Institute Cells', content: 'Cell information will be updated from the backend.' }],
    },
    'institute-cells/exam-cell': {
        title: 'Exam Cell',
        sections: [{ sectionKey: 'exam-cell', title: 'Exam Cell', content: 'Exam cell details will be updated from the backend.' }],
    },
    'institute-cells/anti-ragging-committee': {
        title: 'Anti Ragging Committee',
        sections: [{ sectionKey: 'anti-ragging', title: 'Anti Ragging Committee', content: 'Anti-ragging committee details will be updated from the backend.' }],
    },
    'institute-cells/student-grievance-cell': {
        title: 'Student Grievance Cell',
        sections: [{ sectionKey: 'grievance', title: 'Student Grievance Cell', content: 'Grievance cell details will be updated from the backend.' }],
    },
};

function toTitleCase(value) {
    return value
        .split('/')
        .pop()
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export async function getPageContentData(pageSlug) {
    let sections = [];

    try {
        sections = await db.query.pageContentSections.findMany({
            where: (table) => and(eq(table.pageSlug, pageSlug), eq(table.isActive, true)),
            orderBy: (table) => [asc(table.order), asc(table.id)],
        });
    } catch {
        sections = [];
    }

    if (sections.length > 0) {
        const title = sections[0].title || toTitleCase(pageSlug);
        return {
            title,
            subtitle: '',
            sections,
            source: 'database',
        };
    }

    const fallback = DEFAULT_PAGE_CONTENT[pageSlug] || {
        title: toTitleCase(pageSlug),
        subtitle: '',
        sections: [
            {
                sectionKey: 'overview',
                title: toTitleCase(pageSlug),
                content: 'Content will be available soon. You can manage it from the backend content API.',
            },
        ],
    };

    return {
        ...fallback,
        source: 'fallback',
    };
}
