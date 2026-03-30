import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@theempharmacy.edu';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Hash password for comparison
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);

// Verify admin credentials
export function verifyAdminCredentials(email, password) {
    if (email !== ADMIN_EMAIL) {
        return false;
    }
    
    return bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
}

// Generate JWT token
export function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

// Verify JWT token
export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

// Middleware to check admin authentication
export function requireAuth(request) {
    // First try to get token from cookies
    const cookieToken = getTokenFromCookies(request);
    let token = cookieToken;
    
    // If no cookie token, try authorization header
    if (!token) {
        const authHeader = request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }
    
    if (!token) {
        return { success: false, error: 'No token provided' };
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
        return { success: false, error: 'Invalid token' };
    }
    
    return { success: true, user: decoded };
}

// Extract token from cookies (for browser requests)
export function getTokenFromCookies(request) {
    const cookies = request.headers.get('cookie');
    if (!cookies) return null;
    
    const tokenCookie = cookies
        .split(';')
        .find(cookie => cookie.trim().startsWith('admin_token='));
    
    if (!tokenCookie) return null;
    
    return tokenCookie.split('=')[1];
}
