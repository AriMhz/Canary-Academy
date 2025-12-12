/**
 * Returns the base path for the application
 * In production (GitHub Pages), this will be '/Canary-Academy-demo'
 * In development, this will be ''
 */
export function getBasePath(): string {
    return process.env.NEXT_PUBLIC_BASE_PATH || ''
}

/**
 * Returns the full path for an asset (image, video, etc.)
 * Automatically prepends the base path in production
 * 
 * @param path - The path to the asset (should start with /)
 * @example
 * getAssetPath('/images/logo.png') // Returns '/Canary-Academy-demo/images/logo.png' in production
 */
export function getAssetPath(path: string): string {
    const basePath = getBasePath()
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${basePath}${cleanPath}`
}
