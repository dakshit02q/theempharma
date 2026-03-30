import { NextResponse } from 'next/server';
import { getTokenFromCookies, verifyToken } from '@/lib/auth';

export async function GET(request) {
    try {
        // Get token from cookies
        const token = getTokenFromCookies(request);
        
        if (!token) {
            return NextResponse.json(
                { success: false, error: 'No token found' },
                { status: 401 }
            );
        }
        
        // Verify token
        const decoded = verifyToken(token);
        
        if (!decoded) {
            return NextResponse.json(
                { success: false, error: 'Invalid token' },
                { status: 401 }
            );
        }
        
        return NextResponse.json({
            success: true,
            user: {
                email: decoded.email,
                role: decoded.role
            }
        });
        
    } catch (error) {
        console.error('Token verification error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
