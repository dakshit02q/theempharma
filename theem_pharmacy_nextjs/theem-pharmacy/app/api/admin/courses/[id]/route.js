import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { courses } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

// Update course
export async function PUT(request, { params }) {
    // Check authentication
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return NextResponse.json(
            { success: false, error: authResult.error },
            { status: 401 }
        );
    }

    try {
        const { id } = params;
        const body = await request.json();
        
        const updatedCourse = await db
            .update(courses)
            .set({
                name: body.name,
                description: body.description,
                duration: body.duration,
                eligibility: body.eligibility,
                updatedAt: new Date()
            })
            .where(eq(courses.id, parseInt(id)))
            .returning();

        if (updatedCourse.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updatedCourse[0]
        });
    } catch (error) {
        console.error('Error updating course:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update course' },
            { status: 500 }
        );
    }
}

// Delete course
export async function DELETE(request, { params }) {
    // Check authentication
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return NextResponse.json(
            { success: false, error: authResult.error },
            { status: 401 }
        );
    }

    try {
        const { id } = params;
        
        const deletedCourse = await db
            .delete(courses)
            .where(eq(courses.id, parseInt(id)))
            .returning();

        if (deletedCourse.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting course:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete course' },
            { status: 500 }
        );
    }
}
