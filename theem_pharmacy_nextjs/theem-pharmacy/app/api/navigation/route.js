import { db } from '@/lib/db';
import { navigationItems } from '@/lib/db/schema';
import { apiSuccess, handleApiError } from '@/lib/api/response';

function buildTree(items) {
    const byId = new Map();
    const roots = [];

    for (const item of items) {
        byId.set(item.id, { ...item, children: [] });
    }

    for (const item of items) {
        const current = byId.get(item.id);
        if (!item.parentId || !byId.has(item.parentId)) {
            roots.push(current);
        } else {
            byId.get(item.parentId).children.push(current);
        }
    }

    const sortByOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);
    const sortRecursive = (nodes) => {
        nodes.sort(sortByOrder);
        for (const node of nodes) {
            sortRecursive(node.children);
        }
    };

    sortRecursive(roots);
    return roots;
}

export async function GET() {
    try {
        const items = await db.query.navigationItems.findMany({
            where: (table, { eq }) => eq(table.isActive, true),
            orderBy: (table, { asc }) => [asc(table.order), asc(table.id)],
        });

        return apiSuccess(buildTree(items));
    } catch (error) {
        return handleApiError(error, 'Error fetching navigation tree:', 'Failed to fetch navigation');
    }
}
