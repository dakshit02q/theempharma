import { verifyAdminCredentials, generateToken } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return apiError('Email and password are required', { status: 400 });
        }

        // Verify admin credentials
        const isValid = verifyAdminCredentials(email, password);

        if (!isValid) {
            return apiError('Invalid credentials', { status: 401 });
        }

        // Generate JWT token
        const token = generateToken({
            email,
            role: 'admin',
            loginTime: new Date().toISOString()
        });

        // Create response with token
        const response = apiSuccess({
            user: {
                email,
                role: 'admin'
            }
        }, {
            message: 'Login successful'
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
        return handleApiError(error, 'Admin login error:');
    }
}

// Logout endpoint
export async function DELETE(request) {
    try {
        const response = apiSuccess({}, {
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
        return handleApiError(error, 'Admin logout error:');
    }
}
