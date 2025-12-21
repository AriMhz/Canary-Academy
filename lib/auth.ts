import { NextRequest, NextResponse } from 'next/server';

// Security constants
const SESSION_COOKIE_NAME = 'adminSession';

/**
 * Validates if the request has a valid admin session.
 * Checks for the session token in cookies or Authorization header.
 */
export function isAuthenticated(request: NextRequest): boolean {
    // Check for session token in cookies
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

    if (sessionCookie?.value) {
        try {
            const sessionData = JSON.parse(sessionCookie.value);
            // Validate session has token and is not expired
            if (sessionData.token && sessionData.expiresAt && Date.now() < sessionData.expiresAt) {
                return true;
            }
        } catch {
            // Invalid session format
            return false;
        }
    }

    // Check for Authorization header (for API clients)
    const authHeader = request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        // For API access, check against admin session token stored in header
        // This allows programmatic access from authenticated admin panel
        if (token && token.length > 20) {
            // Basic token validation - must be a non-empty string
            // In production, you'd validate against a server-side session store
            return true;
        }
    }

    return false;
}

/**
 * Middleware function to protect API routes.
 * Returns an error response if not authenticated.
 */
export function requireAuth(request: NextRequest): NextResponse | null {
    if (!isAuthenticated(request)) {
        return NextResponse.json(
            { success: false, error: 'Unauthorized. Admin authentication required.' },
            { status: 401 }
        );
    }
    return null; // Proceed with request
}

/**
 * Validates if a string is a valid MongoDB ObjectId format.
 */
export function isValidObjectId(id: string): boolean {
    return /^[a-fA-F0-9]{24}$/.test(id);
}

/**
 * Sanitizes a string input by trimming and removing dangerous characters.
 */
export function sanitizeString(input: string, maxLength: number = 500): string {
    if (typeof input !== 'string') return '';
    return input
        .trim()
        .slice(0, maxLength)
        .replace(/[<>]/g, ''); // Remove angle brackets to prevent basic HTML injection
}

/**
 * Validates email format.
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates phone number format (basic validation).
 */
export function isValidPhone(phone: string): boolean {
    // Allow digits, spaces, hyphens, plus sign, parentheses
    const phoneRegex = /^[\d\s\-+()]{7,20}$/;
    return phoneRegex.test(phone);
}
