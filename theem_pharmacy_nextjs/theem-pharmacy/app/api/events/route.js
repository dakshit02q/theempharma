import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { events } from '@/lib/db/schema';

export async function GET() {
    try {
        const allEvents = await db.query.events.findMany({
            where: (table, { eq }) => eq(table.isActive, true),
            orderBy: (table, { desc }) => desc(table.eventDate),
        });

        return NextResponse.json({
            success: true,
            data: allEvents
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        const newEvent = await db.insert(events).values({
            title: body.title,
            description: body.description,
            eventDate: body.eventDate,
            startTime: body.startTime,
            endTime: body.endTime,
            venue: body.venue,
            organizer: body.organizer,
            category: body.category || 'general',
            image: body.image,
            registrationRequired: body.registrationRequired || false,
            maxParticipants: body.maxParticipants,
            isActive: body.isActive !== false
        }).returning();

        return NextResponse.json({
            success: true,
            data: newEvent[0]
        });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create event' },
            { status: 500 }
        );
    }
}
