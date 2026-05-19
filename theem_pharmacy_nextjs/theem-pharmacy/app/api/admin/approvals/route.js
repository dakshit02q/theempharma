import { db } from '@/lib/db';
import { approvals } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { parseListQuery, applyListQuery } from '@/lib/api/query';
import { getMissingFields } from '@/lib/api/validation';

export async function GET(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const query = parseListQuery(request, { defaultSortBy: 'approvalDate' });
        const allApprovals = await db.query.approvals.findMany({
            orderBy: (table, { desc, asc }) => [desc(table.approvalDate), asc(table.id)],
        });

        const { data, meta } = applyListQuery(allApprovals, query, {
            searchFields: ['title', 'description', 'approvingBody', 'certificateNumber', 'category'],
            defaultSortBy: 'approvalDate',
        });

        return apiSuccess(data, { meta });
    } catch (error) {
        return handleApiError(error, 'Error fetching approvals:', 'Failed to fetch approvals');
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

        const created = await db.insert(approvals).values({
            title: String(body.title).trim(),
            description: body.description || null,
            approvingBody: body.approvingBody || null,
            approvalDate: body.approvalDate || null,
            validUntil: body.validUntil || null,
            certificateNumber: body.certificateNumber || null,
            document: body.document || null,
            category: body.category || 'academic',
            isActive: body.isActive !== false,
        }).returning();

        return apiSuccess(created[0], {
            status: 201,
            message: 'Approval created successfully',
        });
    } catch (error) {
        return handleApiError(error, 'Error creating approval:', 'Failed to create approval');
    }
}
