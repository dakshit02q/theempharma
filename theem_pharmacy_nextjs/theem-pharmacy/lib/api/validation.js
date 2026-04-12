export function getMissingFields(payload, requiredFields) {
    return requiredFields.filter((field) => {
        const value = payload?.[field];
        if (value === undefined || value === null) {
            return true;
        }
        if (typeof value === 'string' && value.trim() === '') {
            return true;
        }
        return false;
    });
}

export function parseId(value) {
    const parsed = Number.parseInt(String(value), 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
        return null;
    }
    return parsed;
}
