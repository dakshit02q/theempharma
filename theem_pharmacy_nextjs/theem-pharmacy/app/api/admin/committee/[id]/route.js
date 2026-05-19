import { db } from '@/lib/db';
import { committee } from '@/lib/db/schema';
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
            return apiError('Invalid member id', { status: 400 });
        }

        const updateData = {
            updatedAt: new Date(),
        };

        const fields = [
            'name', 'position', 'department', 'email', 'phone', 
            'bio', 'image', 'order', 'isActive'
        ];

        fields.forEach(field => {
            if (body[field] !== undefined) {
                if (field === 'order') {
                    updateData[field] = Number.parseInt(body[field], 10) || 0;
                } else {
                    updateData[field] = body[field];
                }
            }
        });

        const updatedMember = await db
            .update(committee)
            .set(updateData)
            .where(eq(committee.id, id))
            .returning();

        if (updatedMember.length === 0) {
            return apiError('Member not found', { status: 404 });
        }

        return apiSuccess(updatedMember[0]);
    } catch (error) {
        return handleApiError(error, 'Error updating committee member:', 'Failed to update committee member');
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
            return apiError('Invalid member id', { status: 400 });
        }

        const deletedMember = await db
            .delete(committee)
            .where(eq(committee.id, id))
            .returning();

        if (deletedMember.length === 0) {
            return apiError('Member not found', { status: 404 });
        }

        return apiSuccess({}, { message: 'Member deleted successfully' });
    } catch (error) {
        return handleApiError(error, 'Error deleting committee member:', 'Failed to delete committee member');
    }
}
