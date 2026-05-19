export const EDITABLE_PAGES = {
    'home': {
        title: 'Home Page',
        slugs: ['hero', 'metrics', 'programs', 'news', 'synergy', 'cta'],
        titles: {
            'hero': 'Hero & Welcome',
            'metrics': 'Institutional Metrics',
            'programs': 'Programs Overview',
            'news': 'News & Events',
            'synergy': 'Institutional Synergy',
            'cta': 'Call to Action'
        }
    },
    'about': {
        title: 'About Page Subsections',
        slugs: ['vision', 'mission', 'quality-policy', 'core-values', 'board-of-governance', 'leadership-messages', 'administrative-team', 'code-of-conduct'],
        titles: {
            'vision': 'Vision',
            'mission': 'Mission',
            'quality-policy': 'Quality Policy',
            'core-values': 'Core Values',
            'board-of-governance': 'Board of Governance',
            'leadership-messages': 'Leadership Messages',
            'administrative-team': 'Administrative Team',
            'code-of-conduct': 'Code of Conduct'
        }
    },
    'iic': {
        title: 'IIC Management',
        slugs: ['about', 'team', 'initiatives', 'success-stories'],
        titles: {
            'about': 'About IIC',
            'team': 'IIC Team',
            'initiatives': 'Key Initiatives',
            'success-stories': 'Success Stories'
        }
    },
    'students': {
        title: 'Students Corner',
        slugs: ['syllabus', 'library', 'resources'],
        titles: {
            'syllabus': 'Syllabus',
            'library': 'Library',
            'resources': 'Student Resources'
        }
    },
    'institute-cells': {
        title: 'Institute Cells',
        slugs: ['exam-cell', 'anti-ragging-committee', 'anti-discrimination-cell', 'student-grievance-cell', 'server-cell', 'sc-st-cell', 'cdc-cell'],
        titles: {
            'exam-cell': 'Exam Cell',
            'anti-ragging-committee': 'Anti Ragging Committee',
            'anti-discrimination-cell': 'Anti Discrimination Cell',
            'student-grievance-cell': 'Student Grievance Cell',
            'server-cell': 'Server Cell',
            'sc-st-cell': 'SC/ST Cell',
            'cdc-cell': 'CDC Cell'
        }
    }
};

export const ALL_EDITABLE_CATEGORIES = Object.keys(EDITABLE_PAGES);
