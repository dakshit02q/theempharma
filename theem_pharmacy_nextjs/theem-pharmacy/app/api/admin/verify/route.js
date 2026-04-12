import { getTokenFromCookies, verifyToken } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';

export async function GET(request) {
    try {
        // Get token from cookies
        const token = getTokenFromCookies(request);

        if (!token) {
            return apiError('No token found', { status: 401 });
        }

        // Verify token
        const decoded = verifyToken(token);

        if (!decoded) {
            return apiError('Invalid token', { status: 401 });
        }

        return apiSuccess({
            user: {
                email: decoded.email,
                role: decoded.role
            }
        });

    } catch (error) {
        return handleApiError(error, 'Token verification error:');
    }
}
