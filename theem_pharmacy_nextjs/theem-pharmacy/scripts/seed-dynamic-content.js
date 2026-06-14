import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import * as schema from '../lib/db/schema.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });

const SECTIONS = [
    // ACADEMICS - B.PHARMACY
    {
        pageSlug: 'academics/b-pharmacy',
        sectionKey: 'bpharm-overview',
        title: 'B.Pharm Program Excellence',
        content: `The Bachelor of Pharmacy (B.Pharm) is a 4-year undergraduate course that provides a comprehensive understanding of drug synthesis, medicinal chemistry, pharmacology, and pharmaceutical analysis. Our labs are equipped with high-end HPLC, UV Spectrophotometers, and advanced dissolution apparatus.`,
        icon: 'fas fa-graduation-cap',
        order: 1
    },
    {
        pageSlug: 'academics/b-pharmacy',
        sectionKey: 'bpharm-curriculum',
        title: 'Industry-Aligned Curriculum',
        content: `Our curriculum follows PCI standards, focusing on clinical pharmacy, community pharmacy, and industrial training. Students undergo mandatory 150 hours of industrial training in leading pharma units like Cipla, Sun Pharma, and Glenmark.`,
        document: '/uploads/bpharm-full-curriculum.pdf',
        icon: 'fas fa-book-open',
        order: 2
    },
    {
        pageSlug: 'academics/b-pharmacy',
        sectionKey: 'bpharm-labs',
        title: 'Modern Laboratory Infrastructure',
        content: `State-of-the-art laboratories for Pharmaceutics, Pharmaceutical Chemistry, Pharmacology, and Pharmacognosy provide hands-on experience in drug formulation and testing.`,
        icon: 'fas fa-flask',
        order: 3
    },

    // ACADEMICS - D.PHARMACY
    {
        pageSlug: 'academics/d-pharmacy',
        sectionKey: 'dpharm-overview',
        title: 'Diploma in Pharmacy (D.Pharm)',
        content: `A 2-year foundational program designed to produce skilled pharmacy technicians and community pharmacists. The course emphasizes drug storage, dispensing, and healthcare advice.`,
        icon: 'fas fa-scroll',
        order: 1
    },
    {
        pageSlug: 'academics/d-pharmacy',
        sectionKey: 'dpharm-career',
        title: 'Career Opportunities',
        content: `Graduates are eligible to register as pharmacists in India, opening doors to retail pharmacy, hospital pharmacy, and government healthcare sectors.`,
        document: '/uploads/dpharm-career-guide.pdf',
        icon: 'fas fa-briefcase',
        order: 2
    },

    // ADMISSIONS - B.PHARMACY
    {
        pageSlug: 'admissions/b-pharmacy',
        sectionKey: 'bpharm-eligibility',
        title: 'B.Pharm Eligibility Criteria',
        content: `1. Candidate must have passed 10+2 with Physics and Chemistry as compulsory subjects along with Mathematics or Biology.\n2. Minimum 45% marks (40% for SC/ST) in the above subjects.\n3. Mandatory score in MHT-CET or NEET.`,
        icon: 'fas fa-user-check',
        order: 1
    },
    {
        pageSlug: 'admissions/b-pharmacy',
        sectionKey: 'bpharm-fees',
        title: 'Fee Structure & Scholarships',
        content: `Competitive fee structure as per Shikshan Shulka Samiti (SSS) norms. We facilitate government scholarships for EBC, OBC, SC, and ST students.`,
        document: '/uploads/bpharm-fee-structure-2026.pdf',
        icon: 'fas fa-wallet',
        order: 2
    },

    // ADMISSIONS - D.PHARMACY
    {
        pageSlug: 'admissions/d-pharmacy',
        sectionKey: 'dpharm-eligibility',
        title: 'D.Pharm Admission Process',
        content: `Admission is based on merit in 10+2 Science. Candidates must apply through the Centralized Admission Process (CAP) of the Directorate of Technical Education (DTE), Maharashtra.`,
        icon: 'fas fa-file-signature',
        order: 1
    },
    {
        pageSlug: 'admissions/d-pharmacy',
        sectionKey: 'dpharm-docs',
        title: 'Required Documents',
        content: `Ensure you have: 10th & 12th Marksheets, Leaving Certificate, Nationality Certificate, Caste Certificate (if applicable), and Income Certificate.`,
        document: '/uploads/admission-checklist.pdf',
        icon: 'fas fa-clipboard-list',
        order: 2
    },

    // STUDENTS CORNER
    {
        pageSlug: 'students/syllabus',
        sectionKey: 'syllabus-downloads',
        title: 'Academic Syllabus Repository',
        content: `Download the latest semester-wise syllabus for B.Pharmacy (PCI Pattern) and D.Pharmacy. Stay updated with current academic requirements and elective options.`,
        document: '/uploads/pharmacy-syllabus-2026.zip',
        icon: 'fas fa-cloud-download-alt',
        order: 1
    },
    {
        pageSlug: 'students/library',
        sectionKey: 'library-ops',
        title: 'Knowledge Resource Center',
        content: `Our library houses 12,000+ books, 35+ national and international journals, and a dedicated digital section for e-journal access. We use LIBMAN software for seamless book tracking.`,
        icon: 'fas fa-university',
        order: 1
    },
    {
        pageSlug: 'students/library',
        sectionKey: 'library-rules',
        title: 'Library Policies & Conduct',
        content: `Standard operating procedures for borrowing books, renewals, and fine policies. The library is open from 8:00 AM to 6:00 PM on all working days.`,
        document: '/uploads/library-manual.pdf',
        icon: 'fas fa-gavel',
        order: 2
    },
    {
        pageSlug: 'students/resources',
        sectionKey: 'student-forms',
        title: 'Downloadable Forms',
        content: `Quick access to Bonafide application, Railway concession forms, Exam withdrawal forms, and Migration certificate applications.`,
        document: '/uploads/student-essential-forms.zip',
        icon: 'fas fa-file-download',
        order: 1
    },

    // IIC (INSTITUTION INNOVATION COUNCIL)
    {
        pageSlug: 'iic/about',
        sectionKey: 'iic-vision',
        title: 'IIC Mission & Objectives',
        content: `The IIC at Theem College of Pharmacy focuses on creating a vibrant local innovation ecosystem, start-up supporting mechanisms, and preparing students for entrepreneurship challenges.`,
        icon: 'fas fa-lightbulb',
        order: 1
    },
    {
        pageSlug: 'iic/about',
        sectionKey: 'iic-mhrd',
        title: 'MoE Innovation Cell Recognition',
        content: `Established under the MoE's Innovation Cell (MIC), our council actively participates in National Innovation and Start-up Policy (NISP) initiatives.`,
        document: '/uploads/iic-certificate.pdf',
        icon: 'fas fa-award',
        order: 2
    },
    {
        pageSlug: 'iic/team',
        sectionKey: 'iic-leadership',
        title: 'Innovation Council Team',
        content: `Meet the faculty leads and student ambassadors who drive the innovation and entrepreneurship workshops on campus.`,
        document: '/uploads/iic-team-list.pdf',
        icon: 'fas fa-users',
        order: 1
    },

    // INSTITUTE CELLS
    {
        pageSlug: 'institute-cells/exam-cell',
        sectionKey: 'exam-cell-ops',
        title: 'Examination & Evaluation Cell',
        content: `The Exam Cell manages all internal assessments and University of Mumbai final examinations. We ensure strict adherence to examination protocols and timely result declaration.`,
        document: '/uploads/exam-cell-guidelines.pdf',
        icon: 'fas fa-edit',
        order: 1
    },
    {
        pageSlug: 'institute-cells/server-cell',
        sectionKey: 'it-infrastructure',
        title: 'Campus IT & Server Support',
        content: `Our server cell manages the 100 Mbps dedicated fiber-optic backbone, campus-wide Wi-Fi, and the digital learning management systems (LMS).`,
        icon: 'fas fa-server',
        order: 1
    },
    {
        pageSlug: 'institute-cells/anti-ragging-committee',
        sectionKey: 'anti-ragging-policy',
        title: 'Anti-Ragging Committee (ARC)',
        content: `Ragging is strictly prohibited. Our committee, comprising senior faculty, parents, and local administration, ensures a zero-ragging environment through regular monitoring.`,
        document: '/uploads/anti-ragging-handbook.pdf',
        icon: 'fas fa-shield-alt',
        order: 1
    },
    {
        pageSlug: 'institute-cells/anti-discrimination-cell',
        sectionKey: 'diversity-inclusion',
        title: 'Anti-Discrimination Cell',
        content: `Ensuring a campus free from discrimination based on gender, caste, religion, or linguistic background. We foster a culture of equality and mutual respect.`,
        icon: 'fas fa-balance-scale',
        order: 1
    },
    {
        pageSlug: 'institute-cells/student-grievance-cell',
        sectionKey: 'grievance-portal',
        title: 'Grievance Redressal Mechanism',
        content: `A transparent system for students to voice concerns. We guarantee a response within 48 working hours for any academic or administrative grievance.`,
        icon: 'fas fa-headset',
        order: 1
    },
    {
        pageSlug: 'institute-cells/sc-st-cell',
        sectionKey: 'sc-st-welfare',
        title: 'SC/ST & Minority Welfare Cell',
        content: `Providing assistance for scholarship applications, career counseling, and remedial coaching for students from reserved categories.`,
        document: '/uploads/sc-st-cell-minutes.pdf',
        icon: 'fas fa-hand-holding-heart',
        order: 1
    },
    {
        pageSlug: 'institute-cells/cdc-cell',
        sectionKey: 'college-dev',
        title: 'College Development Council',
        content: `Planning institutional growth, academic expansion, and infrastructure modernization to keep pace with global pharmaceutical trends.`,
        icon: 'fas fa-building',
        order: 1
    },

    // ABOUT US SECTIONS
    {
        pageSlug: 'about',
        sectionKey: 'vision',
        title: 'Institutional Vision',
        content: `To become a globally recognized center of excellence in pharmaceutical education and innovative research, fostering a culture of value-based professional learning and healthcare leadership.`,
        icon: 'fas fa-eye',
        order: 1
    },
    {
        pageSlug: 'about',
        sectionKey: 'mission',
        title: 'Our Mission',
        content: `1. To provide a stimulating environment for scholars to acquire and transmit knowledge.\n2. To impart high-quality education and training to cater to the needs of the pharmacy profession.\n3. To promote research and innovation in pharmaceutical sciences for the benefit of society.`,
        icon: 'fas fa-bullseye',
        order: 2
    },
    {
        pageSlug: 'about',
        sectionKey: 'quality-policy',
        title: 'Quality Policy',
        content: `Theem College of Pharmacy is committed to delivering value-based pharmacy education with continuous quality improvement, learner-centric practices, and strong institutional governance. We adhere to the standards prescribed by PCI and other regulatory bodies.`,
        icon: 'fas fa-check-circle',
        order: 3
    },
    {
        pageSlug: 'about',
        sectionKey: 'core-values',
        title: 'Core Values',
        content: `• Excellence in Education\n• Integrity and Ethics\n• Innovation and Research\n• Compassion and Service\n• Professionalism and Teamwork`,
        icon: 'fas fa-gem',
        order: 4
    },
    {
        pageSlug: 'about',
        sectionKey: 'board-of-governance',
        title: 'Board of Governance',
        content: `Our Board of Governance comprises eminent academicians, industry experts, and representatives from the H.J. Thim Trust. They provide strategic direction and ensure institutional excellence through transparent governance.`,
        document: '/uploads/board-members-list.pdf',
        icon: 'fas fa-university',
        order: 5
    },
    {
        pageSlug: 'about',
        sectionKey: 'messages',
        title: 'Leadership Messages',
        content: `Chairman's Perspective\nEducation is the cornerstone of progress, and at Theem College of Pharmacy, we are dedicated to building a legacy of excellence. Our mission is to empower the next generation of pharmaceutical professionals with the knowledge, ethics, and innovation required to lead the global healthcare industry.\n\nPrincipal's Message\nIt is an honor to lead an institution that is so deeply committed to the future of pharmaceutical sciences. Our focus is on holistic development—blending rigorous academic training with hands-on research and industry exposure. We believe in nurturing curious minds and preparing them to tackle the complex challenges of modern medicine with confidence and integrity.`,
        icon: 'fas fa-comment-alt',
        order: 6
    },
    {
        pageSlug: 'about',
        sectionKey: 'administrative-team-desc',
        title: 'Institutional Governance',
        content: `Our administrative team operates as the operational backbone of the institute, ensuring that every academic and research initiative is supported by robust infrastructure and efficient management. From student welfare to industrial collaborations, our team works tirelessly to maintain the highest standards of institutional operation.`,
        icon: 'fas fa-shield-alt',
        order: 7
    },
    {
        pageSlug: 'about',
        sectionKey: 'code-of-conduct',
        title: 'Code of Conduct',
        content: `We maintain high standards of discipline and professional ethics. Our code of conduct applies to all students, faculty, and staff to ensure a productive and respectful campus environment.`,
        document: '/uploads/code-of-conduct.pdf',
        icon: 'fas fa-file-contract',
        order: 9
    }
];

const LEADERSHIP = [
    { name: 'Anwar Hussain J. Thim', position: 'Chairman', image: '/images/chairman.png', bio: 'Pioneering a future where education meets innovation.', order: 1 },
    { name: 'Mohammed Sharif A. Thim', position: 'Vice Chairman', image: '/images/Secretary.png', bio: 'Committed to fostering a culture of academic integrity.', order: 2 },
    { name: 'Dr. Raja Rajeswari Kamisetti', position: 'Principal', image: '/images/principal.png', bio: 'Guiding the next generation of pharmaceutical leaders.', order: 3 },
    { name: 'Dr. S. K. Gupta', position: 'Dean Academics', image: '/images/placeholder-avatar.jpg', bio: 'Ensuring excellence in curriculum and pedagogy.', order: 4 },
    { name: 'Mr. Pradeep Kumar', position: 'Registrar', image: '/images/placeholder-avatar.jpg', bio: 'Managing institutional operations with precision.', order: 5 },
    { name: 'Ms. Anita Sharma', position: 'Head of Administration', image: '/images/placeholder-avatar.jpg', bio: 'Dedicated to student welfare and support.', order: 6 }
];

const GALLERY_ITEMS = {
    carousel: [
        { title: 'Research Lab', image: '/images/julia-koblitz-RlOAwXt2fEA-unsplash.jpg', caption: 'Advanced research facility.', order: 1 },
        { title: 'Campus View', image: '/images/camilo-botia-k4vFDPJoDZk-unsplash.jpg', caption: 'Our beautiful campus.', order: 2 }
    ],
    photos: [
        { title: 'Library', image: '/images/usman-yousaf-GFOlzpLuiCg-unsplash.jpg', caption: 'Knowledge center.', order: 1 }
    ]
};

const COURSES = [
    { name: 'Bachelor of Pharmacy (B.Pharm)', duration: '4 Years', eligibility: '12th Science' },
    { name: 'Diploma in Pharmacy (D.Pharm)', duration: '2 Years', eligibility: '12th Science' }
];

const STATS = [
    { label: 'Placement Rate', value: 95, icon: 'fas fa-briefcase', order: 1 },
    { label: 'Industry Partners', value: 85, icon: 'fas fa-handshake', order: 2 }
];

const EVENTS = [
    { title: 'National Pharmacy Week', description: 'Annual healthcare celebration.', eventDate: '2026-11-20', category: 'academic' },
    { title: 'Sports Gala', description: 'Annual sports meet.', eventDate: '2026-12-05', category: 'cultural' }
];

async function seed() {
    console.log('--- Starting Comprehensive Data Seed ---');
    try {
        // Clear and Seed Sections
        const slugs = [...new Set(SECTIONS.map(s => s.pageSlug))];
        for (const slug of slugs) await db.delete(schema.pageContentSections).where(eq(schema.pageContentSections.pageSlug, slug));
        for (const section of SECTIONS) await db.insert(schema.pageContentSections).values({ ...section, isActive: true });

        // Clear and Seed Committee
        await db.delete(schema.committee);
        for (const member of LEADERSHIP) await db.insert(schema.committee).values({ ...member, isActive: true });

        // Clear and Seed Gallery
        await db.delete(schema.galleryCarouselItems);
        await db.delete(schema.galleryPhotos);
        for (const item of GALLERY_ITEMS.carousel) await db.insert(schema.galleryCarouselItems).values({ ...item, isActive: true });
        for (const item of GALLERY_ITEMS.photos) await db.insert(schema.galleryPhotos).values({ ...item, isActive: true });

        // Clear and Seed Courses
        await db.delete(schema.courses);
        for (const course of COURSES) await db.insert(schema.courses).values(course);

        // Clear and Seed Stats
        await db.delete(schema.statistics);
        for (const stat of STATS) await db.insert(schema.statistics).values({ ...stat, isActive: true });

        // Clear and Seed Events
        await db.delete(schema.events);
        for (const event of EVENTS) await db.insert(schema.events).values({ ...event, isActive: true });

        // Seed Dummy Students & Placements
        await db.delete(schema.students);
        await db.delete(schema.placements);
        for (let i = 1; i <= 5; i++) {
            const [student] = await db.insert(schema.students).values({
                rollNumber: `TCOP2600${i}`,
                name: `Student ${i}`,
                email: `student${i}@theem.edu`,
                status: 'active'
            }).returning();

            await db.insert(schema.placements).values({
                studentId: student.id,
                company: 'Cipla',
                position: 'Pharmacist',
                package: '400000',
                placementDate: '2026-05-01',
                isActive: true
            });
        }

        // Clear and Seed Navigation
        await db.delete(schema.navigationItems);
        
        const mainMenus = [
            { label: 'About Us', slug: '/about', icon: 'fas fa-info-circle', order: 1 },
            { label: 'Academics', slug: '#', icon: 'fas fa-book-open', order: 2 },
            { label: 'Admissions', slug: '#', icon: 'fas fa-file-alt', order: 3 },
            { label: 'Gallery', slug: '/gallery', icon: 'fas fa-images', order: 4 },
            { label: 'Students Corner', slug: '#', icon: 'fas fa-user-graduate', order: 5 },
            { label: 'IIC', slug: '/iic/about', icon: 'fas fa-lightbulb', order: 6 },
            { label: 'Institute Cells', slug: '#', icon: 'fas fa-building', order: 7 },
            { label: 'Approvals', slug: '/approvals', icon: 'fas fa-certificate', order: 8 },
        ];

        const insertedMain = {};
        for (const menu of mainMenus) {
            const [inserted] = await db.insert(schema.navigationItems).values({ ...menu, isActive: true }).returning();
            insertedMain[menu.label] = inserted.id;
        }

        const subMenus = [
            // About Submenus
            { label: 'Vision', slug: '/about/vision', parentLabel: 'About Us', order: 1 },
            { label: 'Mission', slug: '/about/mission', parentLabel: 'About Us', order: 2 },
            { label: 'Quality Policy', slug: '/about/quality-policy', parentLabel: 'About Us', order: 3 },
            { label: 'Core Values', slug: '/about/core-values', parentLabel: 'About Us', order: 4 },
            { label: 'Board of Governance', slug: '/about/board-of-governance', parentLabel: 'About Us', order: 5 },
            { label: 'Messages', slug: '/about/messages', parentLabel: 'About Us', order: 6 },
            { label: 'Administrative Team', slug: '/about/administrative-team', parentLabel: 'About Us', order: 7 },
            { label: 'Code of Conduct', slug: '/about/code-of-conduct', parentLabel: 'About Us', order: 8 },

            // Academics Submenus
            { label: 'B. Pharmacy', slug: '/academics/b-pharmacy', parentLabel: 'Academics', order: 1 },
            { label: 'D. Pharmacy', slug: '/academics/d-pharmacy', parentLabel: 'Academics', order: 2 },

            // Admissions Submenus
            { label: 'B. Pharmacy', slug: '/admissions/b-pharmacy', parentLabel: 'Admissions', order: 1 },
            { label: 'D. Pharmacy', slug: '/admissions/d-pharmacy', parentLabel: 'Admissions', order: 2 },

            // Students Submenus
            { label: 'Syllabus', slug: '/students/syllabus', parentLabel: 'Students Corner', order: 1 },
            { label: 'Library', slug: '/students/library', parentLabel: 'Students Corner', order: 2 },
            { label: 'Student Resources', slug: '/students/resources', parentLabel: 'Students Corner', order: 3 },

            // IIC Submenus
            { label: 'About IIC', slug: '/iic/about', parentLabel: 'IIC', order: 1 },
            { label: 'IIC Team', slug: '/iic/team', parentLabel: 'IIC', order: 2 },

            // Cells Submenus
            { label: 'Exam Cell', slug: '/institute-cells/exam-cell', parentLabel: 'Institute Cells', order: 1 },
            { label: 'Server Cell', slug: '/institute-cells/server-cell', parentLabel: 'Institute Cells', order: 2 },
            { label: 'Anti Ragging Cell', slug: '/institute-cells/anti-ragging-committee', parentLabel: 'Institute Cells', order: 3 },
            { label: 'Anti Discrimination Cell', slug: '/institute-cells/anti-discrimination-cell', parentLabel: 'Institute Cells', order: 4 },
            { label: 'Student Grievance Cell', slug: '/institute-cells/student-grievance-cell', parentLabel: 'Institute Cells', order: 5 },
            { label: 'SC/ST & WEGR Cell', slug: '/institute-cells/sc-st-cell', parentLabel: 'Institute Cells', order: 6 },
            { label: 'CDC Cell', slug: '/institute-cells/cdc-cell', parentLabel: 'Institute Cells', order: 7 },
        ];

        for (const sub of subMenus) {
            const parentId = insertedMain[sub.parentLabel];
            if (parentId) {
                const { parentLabel, ...values } = sub;
                await db.insert(schema.navigationItems).values({ ...values, parentId, isActive: true });
            }
        }
        
        // Clear and Seed Research
        await db.delete(schema.researchProjects);
        await db.delete(schema.publications);
        
        const projects = [
            {
                title: 'Design and Evaluation of Gastro-retentive Drug Delivery Systems',
                principalInvestigator: 'Dr. Raja Rajeswari Kamisetti',
                fundingAgency: 'AICTE-RPS',
                amount: '1200000',
                status: 'Ongoing',
                startDate: '2025-01-15',
                endDate: null,
                isActive: true
            },
            {
                title: 'Development of Novel Herbal Formulations for Wound Healing',
                principalInvestigator: 'Dr. S. K. Gupta',
                fundingAgency: 'University of Mumbai',
                amount: '250000',
                status: 'Completed',
                startDate: '2024-06-01',
                endDate: '2026-01-30',
                isActive: true
            }
        ];

        for (const p of projects) await db.insert(schema.researchProjects).values(p);

        const pubs = [
            {
                title: 'Modern Trends in Pharmaceutical Nanotechnology',
                authors: 'Kamisetti R., et al.',
                journal: 'International Journal of Pharmaceutics',
                year: 2026,
                doi: '10.1016/j.ijpharm.2026.01',
                isActive: true
            },
            {
                title: 'Phytochemical Screening of Medicinal Plants in Palghar Region',
                authors: 'Patel A., Sharma V.',
                journal: 'Journal of Natural Products',
                year: 2025,
                doi: '10.1021/jnp.2025.04',
                isActive: true
            }
        ];

        for (const pub of pubs) await db.insert(schema.publications).values(pub);
        
        // Clear and Seed Approvals
        await db.delete(schema.approvals);
        const approvalDocs = [
            {
                title: 'PCI Extension of Approval 2026-27',
                approvingBody: 'Pharmacy Council of India (PCI)',
                category: 'Institutional Approval',
                approvalDate: '2026-03-10',
                certificateNumber: 'PCI-1245/2026',
                document: '/uploads/pci-approval-2026.pdf',
                isActive: true
            },
            {
                title: 'AICTE EoA 2026-2027',
                approvingBody: 'AICTE',
                category: 'Technical Education',
                approvalDate: '2026-04-05',
                certificateNumber: 'Western/1-3327/2026/EOA',
                document: '/uploads/aicte-eoa-2026.pdf',
                isActive: true
            },
            {
                title: 'DTE Maharashtra Recognition',
                approvingBody: 'DTE Maharashtra',
                category: 'State Recognition',
                approvalDate: '2026-01-20',
                certificateNumber: 'DTE/PH/2026/104',
                document: '/uploads/dte-recognition.pdf',
                isActive: true
            }
        ];

        for (const doc of approvalDocs) await db.insert(schema.approvals).values(doc);
        
        console.log('--- Seed Completed Successfully ---');
    } catch (error) {
        console.error('Seed failed:', error);
    } finally {
        await client.end();
    }
}

seed();
