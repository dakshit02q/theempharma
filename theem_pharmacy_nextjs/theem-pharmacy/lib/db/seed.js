const { db } = require('./db');
const {
    courses,
    faculty,
    admissions,
    aboutContent,
    contactSubmissions,
    features,
    statistics,
} = require('./db/schema');

async function seed() {
    try {
        console.log('Seeding database...');

        // Seed courses
        const coursesData = [
            {
                name: 'B.Pharmacy',
                description: 'A comprehensive 4-year undergraduate program in pharmacy',
                duration: '4 years',
                eligibility: '10+2 with Science (Physics, Chemistry, Biology/Math)',
            },
            {
                name: 'M.Pharmacy',
                description: 'A 2-year advanced degree in pharmaceutical sciences',
                duration: '2 years',
                eligibility: 'Bachelor in Pharmacy',
            },
            {
                name: 'Pharm.D',
                description: 'Doctor of Pharmacy - Professional doctorate program',
                duration: '6 years',
                eligibility: '10+2 with Science',
            },
        ];

        for (const course of coursesData) {
            await db.insert(courses).values(course);
        }
        console.log('✓ Courses seeded');

        // Seed faculty
        const facultyData = [
            {
                name: 'Dr. Ramesh Kumar',
                position: 'Head of Department',
                specialization: 'Pharmacology',
                email: 'ramesh.kumar@theempharmacy.edu',
                phone: '+91-98765-43210',
                bio: 'Expert in Clinical Pharmacology with 15+ years of experience',
            },
            {
                name: 'Prof. Priya Sharma',
                position: 'Associate Professor',
                specialization: 'Pharmaceutical Chemistry',
                email: 'priya.sharma@theempharmacy.edu',
                phone: '+91-98765-43211',
                bio: 'Specialized in Drug Design and Synthesis',
            },
            {
                name: 'Dr. Vikram Singh',
                position: 'Assistant Professor',
                specialization: 'Pharmacognosy',
                email: 'vikram.singh@theempharmacy.edu',
                phone: '+91-98765-43212',
                bio: 'Focused on Natural Product Chemistry and Herbal Medicine',
            },
        ];

        for (const member of facultyData) {
            await db.insert(faculty).values(member);
        }
        console.log('✓ Faculty seeded');

        // Seed about content
        const aboutData = [
            {
                title: 'Our Mission',
                content:
                    'To provide excellence in pharmaceutical education and contribute to healthcare through research and innovation.',
                order: 1,
            },
            {
                title: 'Our Vision',
                content:
                    'To be a leading institution in pharmacy education, recognized for producing skilled pharmacists and advancing pharmaceutical sciences.',
                order: 2,
            },
        ];

        for (const item of aboutData) {
            await db.insert(aboutContent).values(item);
        }
        console.log('✓ About content seeded');

        // Seed features
        const featuresData = [
            {
                title: 'Modern Facilities',
                description: 'State-of-the-art laboratories and research facilities',
                icon: 'building-2',
                order: 1,
            },
            {
                title: 'Expert Faculty',
                description: 'Highly qualified and experienced faculty members',
                icon: 'users',
                order: 2,
            },
            {
                title: 'Industry Connections',
                description: 'Strong partnerships with pharmaceutical industries',
                icon: 'briefcase',
                order: 3,
            },
            {
                title: 'Research Opportunities',
                description: 'Emphasis on research and innovation',
                icon: 'microscope',
                order: 4,
            },
        ];

        for (const feature of featuresData) {
            await db.insert(features).values(feature);
        }
        console.log('✓ Features seeded');

        // Seed statistics
        const statsData = [
            { label: 'Students', value: 500, order: 1 },
            { label: 'Faculty Members', value: 45, order: 2 },
            { label: 'Years of Excellence', value: 20, order: 3 },
            { label: 'Research Publications', value: 150, order: 4 },
        ];

        for (const stat of statsData) {
            await db.insert(statistics).values(stat);
        }
        console.log('✓ Statistics seeded');

        console.log('Database seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();