export const ADMISSIONS_SLUGS = ['b-pharmacy', 'd-pharmacy'];

export const ADMISSIONS_TITLES = {
    'b-pharmacy': 'B.Pharmacy',
    'd-pharmacy': 'D.Pharmacy',
};

export function getAdmissionsPageSlug(slug) {
    return `admissions/${slug}`;
}

