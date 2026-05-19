import { asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { galleryPhotos } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { getMissingFields } from '@/lib/api/validation';

function toOrder(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}

export async function GET(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const items = await db.select().from(galleryPhotos)
            .orderBy(asc(galleryPhotos.order), asc(galleryPhotos.id));

        return apiSuccess(items);
    } catch (error) {
        return handleApiError(error, 'Error fetching gallery photos:', 'Failed to fetch gallery photos');
    }
}

export async function POST(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const body = await request.json();
        const missingFields = getMissingFields(body, ['title', 'image']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const created = await db.insert(galleryPhotos).values({
            title: String(body.title).trim(),
            caption: body.caption || null,
            image: String(body.image).trim(),
            order: toOrder(body.order),
            isActive: body.isActive !== false,
        }).returning();

        return apiSuccess(created[0], {
            status: 201,
            message: 'Gallery photo created successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error creating gallery photo:', 'Failed to create gallery photo');
    }
}
