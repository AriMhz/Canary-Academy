/**
 * Gets the admin session token from sessionStorage if available.
 * This is used by admin components to include auth headers in API requests.
 */
export function getAdminAuthHeaders(): HeadersInit {
    if (typeof window === 'undefined') return {};

    try {
        const sessionData = sessionStorage.getItem('adminSession');
        if (sessionData) {
            const { token } = JSON.parse(sessionData);
            if (token) {
                return {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };
            }
        }
    } catch {
        // Invalid session data
    }

    return { 'Content-Type': 'application/json' };
}

/**
 * Performs an authenticated fetch request for admin API endpoints.
 * Automatically includes the admin session token if available.
 */
export async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = getAdminAuthHeaders();

    return fetch(url, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });
}
