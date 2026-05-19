import { db } from '@/lib/db';
import { researchProjects } from '@/lib/db/schema';
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
            return apiError('Invalid project id', { status: 400 });
        }

        const updateData = {
            updatedAt: new Date(),
        };

        const fields = [
            'title', 'description', 'principalInvestigator', 'startDate',
            'endDate', 'status', 'fundingAgency', 'amount',
            'publicationCount', 'isActive'
        ];

        fields.forEach(field => {
            if (body[field] !== undefined) {
                if (field === 'publicationCount') {
                    updateData[field] = Number.parseInt(body[field], 10) || 0;
                } else {
                    updateData[field] = body[field];
                }
            }
        });

        const updatedProject = await db
            .update(researchProjects)
            .set(updateData)
            .where(eq(researchProjects.id, id))
            .returning();

        if (updatedProject.length === 0) {
            return apiError('Project not found', { status: 404 });
        }

        return apiSuccess(updatedProject[0]);
    } catch (error) {
        return handleApiError(error, 'Error updating research project:', 'Failed to update research project');
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
            return apiError('Invalid project id', { status: 400 });
        }

        const deletedProject = await db
            .delete(researchProjects)
            .where(eq(researchProjects.id, id))
            .returning();

        if (deletedProject.length === 0) {
            return apiError('Project not found', { status: 404 });
        }

        return apiSuccess({}, { message: 'Project deleted successfully' });
    } catch (error) {
        return handleApiError(error, 'Error deleting research project:', 'Failed to delete research project');
    }
}
