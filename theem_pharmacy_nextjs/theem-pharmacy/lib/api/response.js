import { NextResponse } from 'next/server';

export function apiSuccess(data, options = {}) {
    const { status = 200, message, meta } = options;
    const payload = {
        success: true,
        data,
    };

    if (message) {
        payload.message = message;
    }

    if (meta) {
        payload.meta = meta;
    }

    return NextResponse.json(payload, { status });
}

export function apiError(error, options = {}) {
    const { status = 500, code, details } = options;
    const payload = {
        success: false,
        error,
    };

    if (code) {
        payload.code = code;
    }

    if (details !== undefined) {
        payload.details = details;
    }

    return NextResponse.json(payload, { status });
}

export function handleApiError(error, context, fallbackMessage) {
    const message = fallbackMessage || 'Internal server error';
    console.error(context, error);
    return apiError(message, { status: 500 });
}
