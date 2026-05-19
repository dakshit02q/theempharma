import { db } from '@/lib/db';
import { researchProjects } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { getMissingFields } from '@/lib/api/validation';
import { parseListQuery, applyListQuery } from '@/lib/api/query';

export async function GET(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const query = parseListQuery(request, {
            defaultSortBy: 'startDate',
            defaultSortOrder: 'desc',
        });

        const allProjects = await db.query.researchProjects.findMany({
            orderBy: (table, { desc }) => [desc(table.startDate), desc(table.createdAt)],
        });

        const { data, meta } = applyListQuery(allProjects, query, {
            searchFields: ['title', 'description', 'principalInvestigator', 'fundingAgency'],
        });

        return apiSuccess(data, { meta });
    } catch (error) {
        return handleApiError(error, 'Error fetching research projects:', 'Failed to fetch research projects');
    }
}

export async function POST(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const body = await request.json();
        const missingFields = getMissingFields(body, ['title']);

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            });
        }

        const newProject = await db.insert(researchProjects).values({
            title: body.title.trim(),
            description: body.description?.trim() || null,
            principalInvestigator: body.principalInvestigator?.trim() || null,
            startDate: body.startDate || null,
            endDate: body.endDate || null,
            status: body.status || 'ongoing',
            fundingAgency: body.fundingAgency?.trim() || null,
            amount: body.amount || null,
            publicationCount: Number.parseInt(body.publicationCount, 10) || 0,
            isActive: body.isActive !== false,
        }).returning();

        return apiSuccess(newProject[0], { status: 201 });
    } catch (error) {
        return handleApiError(error, 'Error creating research project:', 'Failed to create research project');
    }
}
