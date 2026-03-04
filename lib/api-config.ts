/**
 * API Configuration
 * Centralized API base URL configuration for the application
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://smartprep-backend-2.onrender.com";

/**
 * Get the full API URL for a given endpoint
 * @param endpoint - API endpoint (e.g., '/api/auth/login')
 * @returns Full API URL
 */
export function getApiUrl(endpoint: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
}

