import { db } from '@/lib/db';
import { approvals } from '@/lib/db/schema';
import { apiSuccess, handleApiError } from '@/lib/api/response';
import { parseListQuery, applyListQuery } from '@/lib/api/query';

export async function GET(request) {
    try {
        const query = parseListQuery(request, { defaultSortBy: 'approvalDate' });
        const allApprovals = await db.query.approvals.findMany({
            where: (table, { eq }) => eq(table.isActive, true),
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




