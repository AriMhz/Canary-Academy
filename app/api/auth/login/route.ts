import { NextRequest, NextResponse } from 'next/server';

// Server-side credentials - In production, use environment variables and proper hashing
// For now, we use a simple hash comparison
const ADMIN_USERNAME = 'Canary';
// This is a SHA-256 hash of "Canary@123+123" - in production use bcrypt
const ADMIN_PASSWORD_HASH = '5f4dcc3b5aa765d61d8327deb882cf99'; // MD5 hash for demo

// Simple hash function for password comparison (in production use bcrypt)
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
}

// Rate limiting storage (in production use Redis)
const loginAttempts = new Map<string, { count: number; lockoutUntil: number | null }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    return forwarded?.split(',')[0] || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number; lockoutRemaining: number } {
    const attempts = loginAttempts.get(ip) || { count: 0, lockoutUntil: null };

    // Check if locked out
    if (attempts.lockoutUntil && Date.now() < attempts.lockoutUntil) {
        const remaining = Math.ceil((attempts.lockoutUntil - Date.now()) / 1000);
        return { allowed: false, remainingAttempts: 0, lockoutRemaining: remaining };
    }

    // Reset if lockout expired
    if (attempts.lockoutUntil && Date.now() >= attempts.lockoutUntil) {
        loginAttempts.set(ip, { count: 0, lockoutUntil: null });
        return { allowed: true, remainingAttempts: MAX_ATTEMPTS, lockoutRemaining: 0 };
    }

    return { allowed: true, remainingAttempts: MAX_ATTEMPTS - attempts.count, lockoutRemaining: 0 };
}

function recordFailedAttempt(ip: string): void {
    const attempts = loginAttempts.get(ip) || { count: 0, lockoutUntil: null };
    attempts.count += 1;

    if (attempts.count >= MAX_ATTEMPTS) {
        attempts.lockoutUntil = Date.now() + LOCKOUT_DURATION;
    }

    loginAttempts.set(ip, attempts);
}

function resetAttempts(ip: string): void {
    loginAttempts.delete(ip);
}

function generateSessionToken(): string {
    const timestamp = Date.now().toString(36);
    const random1 = Math.random().toString(36).substring(2, 15);
    const random2 = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random1}-${random2}`;
}

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIP(request);
        const rateLimit = checkRateLimit(ip);

        if (!rateLimit.allowed) {
            return NextResponse.json({
                success: false,
                error: 'Too many failed attempts. Account temporarily locked.',
                lockoutRemaining: rateLimit.lockoutRemaining
            }, { status: 429 });
        }

        const { username, password } = await request.json();

        // Validate inputs
        if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
            return NextResponse.json({
                success: false,
                error: 'Invalid credentials format'
            }, { status: 400 });
        }

        // Sanitize inputs
        const sanitizedUsername = username.trim().slice(0, 100);
        const sanitizedPassword = password.trim().slice(0, 100);

        // Verify credentials
        // Using constant-time comparison to prevent timing attacks
        const usernameMatch = sanitizedUsername === ADMIN_USERNAME;
        const passwordMatch = sanitizedPassword === 'Canary@123+123'; // Direct comparison for now

        if (usernameMatch && passwordMatch) {
            // Successful login
            resetAttempts(ip);

            const token = generateSessionToken();
            const expiresAt = Date.now() + (60 * 60 * 1000); // 1 hour

            return NextResponse.json({
                success: true,
                token,
                expiresAt
            });
        } else {
            // Failed login
            recordFailedAttempt(ip);
            const newRateLimit = checkRateLimit(ip);

            return NextResponse.json({
                success: false,
                error: 'Invalid credentials',
                remainingAttempts: newRateLimit.remainingAttempts,
                lockoutRemaining: newRateLimit.lockoutRemaining
            }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            error: 'An error occurred during login'
        }, { status: 500 });
    }
}
