import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { students } from '@/lib/db/schema';

export async function GET() {
    try {
        // Get students data with statistics
        const allStudents = await db.query.students.findMany({
            where: (table, { eq }) => eq(table.status, 'active'),
            orderBy: (table, { desc }) => desc(table.createdAt),
        });

        // Calculate statistics
        const statistics = {
            totalStudents: allStudents.length,
            activeOrganizations: 12, // Static for now
            eventsPerYear: 25, // Static for now
            placementRate: 95, // Static for now
        };

        // Sample organizations data
        const organizations = [
            {
                id: 1,
                name: 'Pharmaceutical Society',
                description: 'Student organization for pharmaceutical research and development',
                members: 45,
                established: '2024'
            },
            {
                id: 2,
                name: 'Research Club',
                description: 'Dedicated to advancing pharmaceutical research among students',
                members: 32,
                established: '2024'
            }
        ];

        // Sample achievements data
        const achievements = [
            {
                id: 1,
                title: 'National Pharmacy Competition Winner',
                student: 'Priya Sharma',
                year: '2024',
                description: 'First place in National Pharmaceutical Sciences Competition'
            },
            {
                id: 2,
                title: 'Research Paper Publication',
                student: 'Rahul Patel',
                year: '2024',
                description: 'Published research on drug delivery systems in international journal'
            }
        ];

        // Sample events data
        const events = [
            {
                id: 1,
                title: 'Annual Pharmacy Fest',
                date: '2024-03-15',
                type: 'Cultural',
                participants: 200
            },
            {
                id: 2,
                title: 'Industry Expert Lecture Series',
                date: '2024-02-20',
                type: 'Academic',
                participants: 150
            }
        ];

        return NextResponse.json({
            success: true,
            data: {
                statistics,
                organizations,
                achievements,
                events,
                students: allStudents
            }
        });
    } catch (error) {
        console.error('Error fetching students data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch students data' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        const newStudent = await db.insert(students).values({
            rollNumber: body.rollNumber,
            name: body.name,
            courseId: body.courseId,
            semester: body.semester,
            email: body.email,
            phone: body.phone,
            address: body.address,
            admissionYear: body.admissionYear,
            status: body.status || 'active'
        }).returning();

        return NextResponse.json({
            success: true,
            data: newStudent[0]
        });
    } catch (error) {
        console.error('Error creating student:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create student' },
            { status: 500 }
        );
    }
}
