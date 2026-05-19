export const INSTITUTE_CELL_SLUGS = [
    'exam-cell',
    'anti-ragging-committee',
    'anti-discrimination-cell',
    'student-grievance-cell',
    'server-cell',
    'sc-st-cell',
    'cdc-cell',
];

export const INSTITUTE_CELL_TITLES = {
    'exam-cell': 'Exam Cell',
    'anti-ragging-committee': 'Anti Ragging Committee',
    'anti-discrimination-cell': 'Anti Discrimination Cell',
    'student-grievance-cell': 'Student Grievance Cell',
    'server-cell': 'Server Cell',
    'sc-st-cell': 'SC/ST Committee and WEGR Cell',
    'cdc-cell': 'CDC Cell',
};

export function getInstituteCellPageSlug(slug) {
    return `institute-cells/${slug}`;
}
