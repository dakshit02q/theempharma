function toPositiveInt(value, fallback) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
        return fallback;
    }
    return parsed;
}

function compareValues(left, right, order) {
    if (left == null && right == null) return 0;
    if (left == null) return order === 'asc' ? -1 : 1;
    if (right == null) return order === 'asc' ? 1 : -1;

    const leftDate = new Date(left);
    const rightDate = new Date(right);
    const leftIsDate = !Number.isNaN(leftDate.getTime());
    const rightIsDate = !Number.isNaN(rightDate.getTime());

    if (leftIsDate && rightIsDate) {
        return order === 'asc'
            ? leftDate.getTime() - rightDate.getTime()
            : rightDate.getTime() - leftDate.getTime();
    }

    if (typeof left === 'number' && typeof right === 'number') {
        return order === 'asc' ? left - right : right - left;
    }

    const leftText = String(left).toLowerCase();
    const rightText = String(right).toLowerCase();

    if (leftText < rightText) return order === 'asc' ? -1 : 1;
    if (leftText > rightText) return order === 'asc' ? 1 : -1;
    return 0;
}

export function parseListQuery(request, options = {}) {
    const {
        defaultPage = 1,
        defaultLimit = 20,
        maxLimit = 100,
        defaultSortBy = 'id',
        defaultSortOrder = 'desc',
    } = options;

    const { searchParams } = new URL(request.url);
    const page = toPositiveInt(searchParams.get('page'), defaultPage);
    const rawLimit = searchParams.get('limit');
    const limit = rawLimit
        ? Math.min(toPositiveInt(rawLimit, defaultLimit), maxLimit)
        : null;
    const sortBy = (searchParams.get('sortBy') || defaultSortBy).trim();
    const sortOrder = (searchParams.get('sortOrder') || defaultSortOrder)
        .toLowerCase() === 'asc'
        ? 'asc'
        : 'desc';

    return {
        page,
        limit,
        offset: limit ? (page - 1) * limit : 0,
        search: (searchParams.get('search') || '').trim(),
        sortBy,
        sortOrder,
        status: (searchParams.get('status') || '').trim(),
    };
}

export function applyListQuery(items, query, options = {}) {
    const { searchFields = [], defaultSortBy = 'id' } = options;

    let filteredItems = [...items];

    if (query.search && searchFields.length > 0) {
        const searchTerm = query.search.toLowerCase();
        filteredItems = filteredItems.filter((item) =>
            searchFields.some((field) =>
                String(item[field] || '')
                    .toLowerCase()
                    .includes(searchTerm)
            )
        );
    }

    if (query.status) {
        const statusTerm = query.status.toLowerCase();
        filteredItems = filteredItems.filter(
            (item) => String(item.status || '').toLowerCase() === statusTerm
        );
    }

    const hasSortField =
        filteredItems.length > 0 &&
        Object.prototype.hasOwnProperty.call(filteredItems[0], query.sortBy);
    const sortBy = hasSortField ? query.sortBy : defaultSortBy;

    filteredItems.sort((left, right) =>
        compareValues(left[sortBy], right[sortBy], query.sortOrder)
    );

    const total = filteredItems.length;
    const effectiveLimit = query.limit || Math.max(total, 1);
    const totalPages = Math.max(1, Math.ceil(total / effectiveLimit));
    const pagedItems = filteredItems.slice(query.offset, query.offset + effectiveLimit);

    return {
        data: pagedItems,
        meta: {
            page: query.page,
            limit: effectiveLimit,
            total,
            totalPages,
            sortBy,
            sortOrder: query.sortOrder,
            search: query.search || undefined,
            status: query.status || undefined,
        },
    };
}
