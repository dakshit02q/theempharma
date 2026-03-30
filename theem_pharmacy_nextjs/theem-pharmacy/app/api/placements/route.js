import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { placements, students } from '@/lib/db/schema';

export async function GET() {
    try {
        const allPlacements = await db.query.placements.findMany({
            where: (table, { eq }) => eq(table.isActive, true),
            orderBy: (table, { desc }) => desc(table.placementDate),
        });

        return NextResponse.json({
            success: true,
            data: allPlacements
        });
    } catch (error) {
        console.error('Error fetching placements:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch placements' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        const newPlacement = await db.insert(placements).values({
            studentId: body.studentId,
            company: body.company,
            position: body.position,
            package: body.package,
            placementDate: body.placementDate,
            location: body.location,
            isActive: body.isActive !== false
        }).returning();

        return NextResponse.json({
            success: true,
            data: newPlacement[0]
        });
    } catch (error) {
        console.error('Error creating placement:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create placement' },
            { status: 500 }
        );
    }
}
