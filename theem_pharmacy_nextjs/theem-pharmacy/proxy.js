import { NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];

export function proxy(request) {
    const res = NextResponse.next();

    // Always set CORS headers (including for 401/404/etc)
    res.headers.set('Access-Control-Allow-Origin', allowedOrigins.join(','));
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.headers.set('Access-Control-Allow-Credentials', 'true');

    // Handle OPTIONS preflight explicitly
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': allowedOrigins.join(','),
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                'Access-Control-Allow-Credentials': 'true',
            },
        });
    }

    return res;
}

// Apply only to API routes
export const config = {
    matcher: '/api/:path*',
};
