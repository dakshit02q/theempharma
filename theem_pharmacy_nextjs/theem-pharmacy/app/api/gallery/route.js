import { asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { galleryCarouselItems, galleryPhotos } from '@/lib/db/schema';
import { apiSuccess, handleApiError } from '@/lib/api/response';

export async function GET() {
    try {
        const [carousel, photos] = await Promise.all([
            db.select().from(galleryCarouselItems)
                .where(eq(galleryCarouselItems.isActive, true))
                .orderBy(asc(galleryCarouselItems.order), asc(galleryCarouselItems.id)),
            db.select().from(galleryPhotos)
                .where(eq(galleryPhotos.isActive, true))
                .orderBy(asc(galleryPhotos.order), asc(galleryPhotos.id)),
        ]);

        return apiSuccess({ carousel, photos });
    } catch (error) {
        return handleApiError(error, 'Error fetching gallery:', 'Failed to fetch gallery');
    }
}
