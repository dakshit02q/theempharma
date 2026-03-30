import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { admissions } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

// Update admission status
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
        
        const updatedAdmission = await db
            .update(admissions)
            .set({
                status: body.status,
                updatedAt: new Date()
            })
            .where(eq(admissions.id, parseInt(id)))
            .returning();

        if (updatedAdmission.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Admission not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updatedAdmission[0]
        });
    } catch (error) {
        console.error('Error updating admission:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update admission' },
            { status: 500 }
        );
    }
}
