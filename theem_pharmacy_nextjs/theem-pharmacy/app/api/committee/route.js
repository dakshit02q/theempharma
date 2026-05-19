import { db } from '@/lib/db';
import { committee } from '@/lib/db/schema';
import { apiSuccess, handleApiError } from '@/lib/api/response';

export async function GET() {
    try {
        const members = await db.query.committee.findMany({
            where: (table, { eq }) => eq(table.isActive, true),
            orderBy: (table, { asc }) => [asc(table.order), asc(table.id)],
        });

        return apiSuccess(members);
    } catch (error) {
        return handleApiError(error, 'Error fetching committee members:', 'Failed to fetch committee members');
    }
}
