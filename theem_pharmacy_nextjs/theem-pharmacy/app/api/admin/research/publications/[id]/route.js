import { db } from '@/lib/db';
import { publications } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseId } from '@/lib/api/validation';

export async function PUT(request, { params }) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const { id: rawId } = await params;
        const id = parseId(rawId);
        const body = await request.json();

        if (!id) {
            return apiError('Invalid publication id', { status: 400 });
        }

        const updateData = {
            updatedAt: new Date(),
        };

        const fields = [
            'title', 'authors', 'journal', 'year', 'volume', 
            'pages', 'doi', 'impactFactor', 'isActive'
        ];

        fields.forEach(field => {
            if (body[field] !== undefined) {
                if (field === 'year') {
                    updateData[field] = Number.parseInt(body[field], 10) || null;
                } else {
                    updateData[field] = body[field];
                }
            }
        });

        const updatedPublication = await db
            .update(publications)
            .set(updateData)
            .where(eq(publications.id, id))
            .returning();

        if (updatedPublication.length === 0) {
            return apiError('Publication not found', { status: 404 });
        }

        return apiSuccess(updatedPublication[0]);
    } catch (error) {
        return handleApiError(error, 'Error updating publication:', 'Failed to update publication');
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
            return apiError('Invalid publication id', { status: 400 });
        }

        const deletedPublication = await db
            .delete(publications)
            .where(eq(publications.id, id))
            .returning();

        if (deletedPublication.length === 0) {
            return apiError('Publication not found', { status: 404 });
        }

        return apiSuccess({}, { message: 'Publication deleted successfully' });
    } catch (error) {
        return handleApiError(error, 'Error deleting publication:', 'Failed to delete publication');
    }
}
