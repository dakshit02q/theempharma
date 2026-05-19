import { db } from '@/lib/db';
import { events } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId, getMissingFields } from '@/lib/api/validation';
import { deletePublicFile } from '@/lib/storage/files';

function parseOptionalInt(value) {
    if (value === undefined || value === null || value === '') {
        return null;
    }

    const parsed = Number.parseInt(String(value), 10);
    return Number.isNaN(parsed) ? null : parsed;
}

export async function PUT(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        if (!id) {
            return apiError('Invalid event id', { status: 400 });
        }

        const body = await request.json();
        const missingFields = getMissingFields(body, ['title']);
        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const parsedMaxParticipants = parseOptionalInt(body.maxParticipants);
        if (body.maxParticipants && parsedMaxParticipants === null) {
            return apiError('Invalid maxParticipants', { status: 400 });
        }

        const updatedEvent = await db
            .update(events)
            .set({
                title: body.title,
                description: body.description,
                eventDate: body.eventDate,
                startTime: body.startTime,
                endTime: body.endTime,
                venue: body.venue,
                organizer: body.organizer,
                category: body.category || 'general',
                image: body.image,
                registrationRequired: Boolean(body.registrationRequired),
                maxParticipants: parsedMaxParticipants,
                isActive: body.isActive !== false,
                updatedAt: new Date(),
            })
            .where(eq(events.id, id))
            .returning();

        if (updatedEvent.length === 0) {
            return apiError('Event not found', { status: 404 });
        }

        return apiSuccess(updatedEvent[0], {
            message: 'Event updated successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error updating event:', 'Failed to update event');
    }
}

export async function DELETE(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        if (!id) {
            return apiError('Invalid event id', { status: 400 });
        }

        const deletedEvent = await db
            .delete(events)
            .where(eq(events.id, id))
            .returning();

        if (deletedEvent.length === 0) {
            return apiError('Event not found', { status: 404 });
        }

        // remove uploaded image if present
        if (deletedEvent[0]?.image) {
            await deletePublicFile(deletedEvent[0].image);
        }

        return apiSuccess({}, {
            message: 'Event deleted successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error deleting event:', 'Failed to delete event');
    }
}
