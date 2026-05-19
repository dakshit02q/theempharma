import { asc, eq } from 'drizzle-orm';
import GalleryShowcasePage from '@/components/pages/GalleryShowcasePage';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { db } from '@/lib/db';
import { galleryCarouselItems, galleryPhotos } from '@/lib/db/schema';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return {
        title: 'Gallery - Theem College of Pharmacy',
        description: 'Gallery highlights and moments from Theem College of Pharmacy and Research.',
        openGraph: generateOGMetadata('gallery', {
            title: 'Gallery - Theem College of Pharmacy',
            description: 'Gallery highlights and moments from Theem College of Pharmacy and Research.',
            path: '/gallery',
        }),
        twitter: generateTwitterMetadata('gallery', {
            title: 'Gallery - Theem College of Pharmacy',
            description: 'Gallery highlights and moments from Theem College of Pharmacy and Research.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/gallery',
        },
    };
}

async function getGalleryData() {
    try {
        const [carousel, photos] = await Promise.all([
            db.select().from(galleryCarouselItems)
                .where(eq(galleryCarouselItems.isActive, true))
                .orderBy(asc(galleryCarouselItems.order), asc(galleryCarouselItems.id)),
            db.select().from(galleryPhotos)
                .where(eq(galleryPhotos.isActive, true))
                .orderBy(asc(galleryPhotos.order), asc(galleryPhotos.id)),
        ]);

        return { carousel, photos };
    } catch (error) {
        console.error('Error fetching gallery data:', error);
        return { carousel: [], photos: [] };
    }
}

export default async function GalleryPage() {
    const { carousel, photos } = await getGalleryData();

    return (
        <>
            <GalleryShowcasePage
                title="Gallery"
                subtitle="Highlights and moments from the institute."
                carouselItems={carousel}
                photoItems={photos}
            />
            <ScrollToTopButton />
        </>
    );
}
