import { NextResponse } from 'next/server';
import { verifyAdminCredentials, generateToken } from '@/lib/auth';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        
        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Email and password are required' },
                { status: 400 }
            );
        }
        
        // Verify admin credentials
        const isValid = verifyAdminCredentials(email, password);
        
        if (!isValid) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }
        
        // Generate JWT token
        const token = generateToken({
            email,
            role: 'admin',
            loginTime: new Date().toISOString()
        });
        
        // Create response with token
        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            user: {
                email,
                role: 'admin'
            }
        });
        
        // Set HTTP-only cookie for browser security
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        
        return response;
        
    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Logout endpoint
export async function DELETE(request) {
    try {
        const response = NextResponse.json({
            success: true,
            message: 'Logout successful'
        });
        
        // Clear the admin token cookie
        response.cookies.set('admin_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0
        });
        
        return response;
        
    } catch (error) {
        console.error('Admin logout error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
