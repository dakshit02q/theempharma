import { db } from '@/lib/db';
import { events } from '@/lib/db/schema';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseListQuery, applyListQuery } from '@/lib/api/query';
import { getMissingFields } from '@/lib/api/validation';

export async function GET(request) {
    try {
        const query = parseListQuery(request, { defaultSortBy: 'eventDate' });
        const allEvents = await db.query.events.findMany({
            where: (table, { eq }) => eq(table.isActive, true),
            orderBy: (table, { desc }) => desc(table.eventDate),
        });

        const { data, meta } = applyListQuery(allEvents, query, {
            searchFields: ['title', 'description', 'venue', 'organizer', 'category'],
            defaultSortBy: 'eventDate',
        });

        return apiSuccess(data, { meta });
    } catch (error) {
        return handleApiError(error, 'Error fetching events:', 'Failed to fetch events');
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const missingFields = getMissingFields(body, ['title']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const parsedMaxParticipants = body.maxParticipants
            ? Number.parseInt(body.maxParticipants, 10)
            : null;

        if (body.maxParticipants && Number.isNaN(parsedMaxParticipants)) {
            return apiError('Invalid maxParticipants', { status: 400 });
        }

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
            maxParticipants: parsedMaxParticipants,
            isActive: body.isActive !== false
        }).returning();

        return apiSuccess(newEvent[0], {
            status: 201,
            message: 'Event created successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error creating event:', 'Failed to create event');
    }
}
