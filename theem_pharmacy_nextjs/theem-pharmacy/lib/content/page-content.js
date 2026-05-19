import { and, asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { pageContentSections } from '@/lib/db/schema';

// Lazy-loaded content chunks to reduce constant memory pressure
function getDefaultPageContent() {
    return {
        'home': {
            title: 'Home Page',
            sections: [
                {
                    sectionKey: 'hero',
                    title: 'Hero Section',
                    content: JSON.stringify({
                        label: 'Admission Protocol 2024-25',
                        heading: 'Orchestrating <br/><span class="text-[var(--brand-accent)]">Pharmacy</span> <br/> Excellence.',
                        description: 'Empowering the next generation of pharmaceutical scientists through advanced research paradigms, ethical governance, and industrial synergy.',
                    })
                },
                {
                    sectionKey: 'metrics',
                    title: 'Institutional Metrics',
                    content: JSON.stringify({
                        layout: 'grid',
                        items: [
                            { label: 'Scholastic Seats', value: '120+', icon: 'fa-user-graduate', color: 'primary' },
                            { label: 'Advanced Programs', value: '02', icon: 'fa-microscope', color: 'teal' },
                            { label: 'Placement Target', value: '100%', icon: 'fa-briefcase', color: 'accent' },
                            { label: 'Founded Epoch', value: '2024', icon: 'fa-university', color: 'primary' }
                        ]
                    })
                },
                {
                    sectionKey: 'programs',
                    title: 'Programs Overview',
                    content: JSON.stringify({
                        heading: 'Professional Programs',
                        subheading: 'Academic Architecture',
                        items: [
                            { 
                                title: 'Bachelor of Pharmacy (B.Pharm)', 
                                duration: '04 Years Degree Protocol', 
                                description: 'A comprehensive undergraduate paradigm architected for pharmaceutical mastery and advanced clinical research integration.',
                                icon: 'fa-user-md',
                                seats: '60 Annual Seats',
                                link: '/academics/b-pharmacy'
                            },
                            { 
                                title: 'Diploma in Pharmacy (D.Pharm)', 
                                duration: '02 Years Applied Diploma', 
                                description: 'An intensive technical protocol designed to engineer practical proficiency in pharmaceutical logistics and community healthcare.',
                                icon: 'fa-pills',
                                seats: '60 Annual Seats',
                                link: '/academics/d-pharmacy'
                            }
                        ]
                    })
                },
                {
                    sectionKey: 'synergy',
                    title: 'Institutional Synergy',
                    content: JSON.stringify({
                        heading1: 'Architecting the Future of Science.',
                        desc1: 'Theem College of Pharmacy is not merely an educational entity; it is a collaborative ecosystem where research, discipline, and industrial innovation converge to define the pharmaceutical elite.',
                        heading2: 'Sophisticated Learning Hubs.',
                        desc2: 'Our infrastructure is architected to foster critical thinking, with state-of-the-art diagnostic labs, digital repositories, and clinical simulation zones.'
                    })
                },
                {
                    sectionKey: 'cta',
                    title: 'Call to Action',
                    content: JSON.stringify({
                        heading: 'Begin Your Professional <br /> Orchestration.',
                        description: 'Synchronize your career with the highest standards of pharmaceutical excellence. Institutional intake for the 2024-25 cycle is now active.'
                    })
                }
            ]
        },
        'about': {
            title: 'About Theem College of Pharmacy',
            subtitle: 'Excellence in pharmaceutical education and research under the aegis of H.J. Thim Trust.',
            sections: [
                {
                    sectionKey: 'mission-vision',
                    title: 'Our Mission & Vision',
                    icon: 'fas fa-eye',
                    content: JSON.stringify({
                        layout: 'grid',
                        items: [
                            { title: 'Our Vision', description: 'To become a globally recognized center of excellence in pharmaceutical education and innovative research, fostering a culture of value-based professional learning.', icon: 'fa-lightbulb' },
                            { title: 'Our Mission', description: 'To provide a stimulating environment for scholars to acquire and transmit knowledge through teaching and research in pharmaceutical sciences.', icon: 'fa-target-shot' }
                        ]
                    })
                },
                {
                    sectionKey: 'quality-policy',
                    title: 'Quality Policy',
                    icon: 'fas fa-shield-alt',
                    content: JSON.stringify({
                        layout: 'accordion',
                        items: [
                            { title: 'Academic Excellence', description: 'We are committed to delivering value-based pharmacy education with continuous quality improvement and learner-centric practices.' },
                            { title: 'Institutional Governance', description: 'Strong governance and transparency in all administrative and academic processes.' },
                            { title: 'Regulatory Compliance', description: 'Strict adherence to standards prescribed by PCI, AICTE, and University of Mumbai.' }
                        ]
                    })
                }
            ],
        },
        'about/core-values': {
            title: 'Institutional Core Values',
            sections: [
                {
                    sectionKey: 'values',
                    title: 'Our Pillars of Excellence',
                    icon: 'fas fa-university',
                    content: JSON.stringify({
                        layout: 'grid',
                        items: [
                            { title: 'Integrity', description: 'Maintaining the highest ethical standards in all professional and academic pursuits.', icon: 'fa-balance-scale' },
                            { title: 'Innovation', description: 'Encouraging creative thinking and novel approaches in pharmaceutical research.', icon: 'fa-flask' },
                            { title: 'Compassion', description: 'Fostering a culture of empathy and social responsibility towards patient care.', icon: 'fa-heartbeat' },
                            { title: 'Professionalism', description: 'Instilling discipline, competence, and accountability in our future pharmacists.', icon: 'fa-user-tie' }
                        ]
                    })
                }
            ],
        },
        'academics/b-pharmacy': {
            title: 'Bachelor of Pharmacy (B.Pharm)',
            subtitle: '4-Year Undergraduate Degree Program',
            sections: [
                {
                    sectionKey: 'overview',
                    title: 'Program Overview',
                    icon: 'fas fa-book-reader',
                    content: 'The B.Pharm program is a comprehensive 4-year degree designed to build strong foundations in pharmaceutical technology, pharmacology, and clinical practice. Approved by PCI and affiliated with University of Mumbai, it prepares students for diverse roles in the healthcare industry.\n\nKey Highlights:\n• State-of-the-art Research Labs\n• Industry-Integrated Curriculum\n• 100% Placement Assistance\n• Expert Faculty with Clinical Experience'
                },
                {
                    sectionKey: 'details',
                    title: 'Program Details',
                    icon: 'fas fa-list-alt',
                    content: JSON.stringify({
                        layout: 'table',
                        headers: ['Feature', 'Description'],
                        items: [
                            { feature: 'Duration', description: '4 Years (8 Semesters)' },
                            { feature: 'Total Seats', description: '60 Seats' },
                            { feature: 'Eligibility', description: '10+2 with PCM/PCB and CET/NEET' },
                            { feature: 'Affiliation', description: 'University of Mumbai' }
                        ]
                    })
                },
                {
                    sectionKey: 'curriculum',
                    title: 'Curriculum Breakdown',
                    icon: 'fas fa-layer-group',
                    content: JSON.stringify({
                        layout: 'tabs',
                        items: [
                            { label: 'Year 1', title: 'Foundational Sciences', content: '• Human Anatomy and Physiology\n• Pharmaceutical Analysis\n• Pharmaceutics - I\n• Pharmaceutical Inorganic Chemistry\n• Communication Skills\n• Remedial Biology/Mathematics' },
                            { label: 'Year 2', title: 'Core Pharmaceutical Sciences', content: '• Pharmaceutical Organic Chemistry\n• Physical Pharmaceutics\n• Pharmaceutical Microbiology\n• Pharmaceutical Engineering\n• Pharmacognosy and Phytochemistry' },
                            { label: 'Year 3', title: 'Advanced Applications', content: '• Medicinal Chemistry\n• Industrial Pharmacy\n• Pharmacology\n• Pharmacognosy\n• Pharmaceutical Jurisprudence' },
                            { label: 'Year 4', title: 'Clinical & Industrial Prep', content: '• Instrumental Methods of Analysis\n• Industrial Pharmacy - II\n• Pharmacy Practice\n• Novel Drug Delivery Systems\n• Biopharmaceutics and Pharmacokinetics' }
                        ]
                    })
                }
            ],
        },
        'academics/d-pharmacy': {
            title: 'Diploma in Pharmacy (D.Pharm)',
            subtitle: '2-Year Diploma Program',
            sections: [
                {
                    sectionKey: 'overview',
                    title: 'Program Overview',
                    icon: 'fas fa-pills',
                    content: 'The D.Pharm course is a foundational 2-year program architected for precision in practical pharmacy skills, pharmaceutical logistics, and community healthcare management. It is the ideal entry point for early-career pharmacy professionals.'
                },
                {
                    sectionKey: 'curriculum',
                    title: 'Syllabus Framework',
                    icon: 'fas fa-scroll',
                    content: JSON.stringify({
                        layout: 'tabs',
                        items: [
                            { label: 'Year 1', title: 'Part I', content: '• Pharmaceutics - I\n• Pharmaceutical Chemistry - I\n• Pharmacognosy\n• Biochemistry & Clinical Pathology\n• Human Anatomy & Physiology\n• Health Education & Community Pharmacy' },
                            { label: 'Year 2', title: 'Part II', content: '• Pharmaceutics - II\n• Pharmaceutical Chemistry - II\n• Pharmacology & Toxicology\n• Pharmaceutical Jurisprudence\n• Drug Store and Business Management\n• Hospital & Clinical Pharmacy' }
                        ]
                    })
                }
            ],
        },
        'admissions/b-pharmacy': {
            title: 'B.Pharm Admissions',
            sections: [
                {
                    sectionKey: 'eligibility',
                    title: 'Eligibility Criteria',
                    icon: 'fas fa-check-double',
                    content: JSON.stringify({
                        layout: 'table',
                        headers: ['Criteria', 'Requirement'],
                        items: [
                            { criteria: 'Educational Qualification', requirement: '10+2 with Physics, Chemistry, and Biology/Mathematics' },
                            { criteria: 'Minimum Marks', requirement: '50% for Open (45% for Reserved categories)' },
                            { criteria: 'Entrance Exam', requirement: 'Valid score in MHT-CET or NEET' },
                            { criteria: 'Age Limit', requirement: 'Minimum 17 years as of 31st December' }
                        ]
                    })
                },
                {
                    sectionKey: 'process',
                    title: 'Selection Process',
                    icon: 'fas fa-walking',
                    content: JSON.stringify({
                        layout: 'accordion',
                        items: [
                            { title: 'Step 1: Registration', description: 'Register online via the state CET portal and fill out the preference form.' },
                            { title: 'Step 2: Merit List', description: 'The state cell releases a merit list based on entrance scores and academic performance.' },
                            { title: 'Step 3: Counseling & Allotment', description: 'Seat allotment is done through the Centralized Admission Process (CAP) rounds.' },
                            { title: 'Step 4: Reporting', description: 'Report to the college with original documents for verification and fee payment.' }
                        ]
                    })
                }
            ],
        },
        'institute-cells/anti-discrimination-cell': {
            title: 'Anti-Discrimination Cell',
            sections: [
                {
                    sectionKey: 'overview',
                    title: 'Inclusive Campus Commitment',
                    icon: 'fas fa-hands-helping',
                    content: 'Theem College of Pharmacy is committed to providing an inclusive and welcoming environment for all members of its community. The Anti-Discrimination Cell ensures that no student or staff is discriminated against on the basis of caste, creed, religion, or gender.'
                },
                {
                    sectionKey: 'guidelines',
                    title: 'Institutional Guidelines',
                    icon: 'fas fa-list-ul',
                    content: '• Immediate inquiry into any reported incident of discrimination.\n• Periodic sensitization workshops for students and faculty.\n• Safe and confidential reporting mechanism.'
                }
            ],
        },
        'institute-cells/student-grievance-cell': {
            title: 'Student Grievance Redressal Cell',
            sections: [
                {
                    sectionKey: 'objective',
                    title: 'Redressal Mechanism',
                    icon: 'fas fa-balance-scale',
                    content: 'To provide a mechanism to students of the college for redressal of their grievances and to provide a platform for students to voice their concerns regarding academic or administrative matters.'
                },
                {
                    sectionKey: 'committee',
                    title: 'Grievance Committee',
                    icon: 'fas fa-user-friends',
                    content: JSON.stringify({
                        layout: 'table',
                        headers: ['Designation', 'Name'],
                        items: [
                            { designation: 'Chairperson', name: 'Principal, Theem College of Pharmacy' },
                            { designation: 'Member Secretary', name: 'Senior Faculty Member' },
                            { designation: 'Member', name: 'Student Representative (General Secretary)' }
                        ]
                    })
                }
            ],
        },
        'institute-cells/sc-st-cell': {
            title: 'SC/ST Committee & WEGR Cell',
            sections: [
                {
                    sectionKey: 'purpose',
                    title: 'Empowerment & Support',
                    icon: 'fas fa-fist-raised',
                    content: 'Dedicated to the empowerment of SC/ST students and staff, ensuring their rights and providing support for scholarships and career advancement.'
                }
            ],
        },
        'students/syllabus': {
            title: 'Academic Syllabus',
            sections: [
                {
                    sectionKey: 'b-pharm',
                    title: 'B.Pharmacy Syllabus',
                    icon: 'fas fa-file-pdf',
                    content: JSON.stringify({
                        layout: 'table',
                        headers: ['Semester', 'Syllabus Copy'],
                        items: [
                            { semester: 'Semester I & II', link: 'View/Download' },
                            { semester: 'Semester III & IV', link: 'View/Download' },
                            { semester: 'Semester V & VI', link: 'View/Download' },
                            { semester: 'Semester VII & VIII', link: 'View/Download' }
                        ]
                    })
                },
                {
                    sectionKey: 'd-pharm',
                    title: 'D.Pharmacy Syllabus',
                    icon: 'fas fa-file-pdf',
                    content: JSON.stringify({
                        layout: 'table',
                        headers: ['Year', 'Syllabus Copy'],
                        items: [
                            { year: 'First Year', link: 'View/Download' },
                            { year: 'Second Year', link: 'View/Download' }
                        ]
                    })
                }
            ],
        },
        'students/resources': {
            title: 'Student Resources',
            sections: [
                {
                    sectionKey: 'links',
                    title: 'Quick Access Links',
                    icon: 'fas fa-external-link-alt',
                    content: JSON.stringify({
                        layout: 'grid',
                        items: [
                            { title: 'Examination Portal', description: 'Access internal marks and university results.', icon: 'fa-laptop-code' },
                            { title: 'E-Library Access', description: 'Log in to Delnet and Nlist journals.', icon: 'fa-book-reader' },
                            { title: 'Placement Portal', description: 'Register for upcoming campus drives.', icon: 'fa-briefcase' },
                            { title: 'Hostel Guidelines', description: 'Download hostel rules and regulations.', icon: 'fa-hotel' }
                        ]
                    })
                }
            ],
        },
        'alumni': {
            title: 'Alumni Network',
            sections: [
                {
                    sectionKey: 'impact',
                    title: 'Alumni Footprint',
                    icon: 'fas fa-globe',
                    content: JSON.stringify({
                        layout: 'grid',
                        items: [
                            { title: 'Global Presence', description: 'Our alumni are working in over 10 countries across the globe.', icon: 'fa-map-marker-alt' },
                            { title: 'Industry Leaders', description: 'Many hold leadership positions in top pharma MNCs.', icon: 'fa-crown' },
                            { title: 'Mentorship', description: 'Active engagement in mentoring current students.', icon: 'fa-user-graduate' }
                        ]
                    })
                }
            ],
        },
        'approvals': {
            title: 'Institutional Approvals & Accreditations',
            sections: [
                {
                    sectionKey: 'bodies',
                    title: 'Regulatory Approvals',
                    icon: 'fas fa-certificate',
                    content: JSON.stringify({
                        layout: 'table',
                        headers: ['Regulatory Body', 'Status'],
                        items: [
                            { body: 'Pharmacy Council of India (PCI)', status: 'Approved' },
                            { body: 'All India Council for Technical Education (AICTE)', status: 'Approved' },
                            { body: 'Directorate of Technical Education (DTE)', status: 'Approved' },
                            { body: 'University of Mumbai', status: 'Affiliated' }
                        ]
                    })
                }
            ],
        }
    };
}

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

    const fallback = getDefaultPageContent()[pageSlug] || {
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
