const { db } = require('@/lib/db');
const { courses } = require('@/lib/db/schema');
const { NextResponse } = require('next/server');

async function GET() {
    try {
        const allCourses = await db.query.courses.findMany();
        return NextResponse.json(allCourses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}

async function POST(request) {
    try {
        const body = await request.json();
        const newCourse = await db.insert(courses).values(body).returning();
        return NextResponse.json(newCourse[0], { status: 201 });
    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json(
            { error: 'Failed to create course' },
            { status: 500 }
        );
    }
}

module.exports = { GET, POST };