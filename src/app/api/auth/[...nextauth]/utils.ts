/**
 * Server-side utility functions for authentication
 */

interface UserData {
  email: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  image?: string;
  id?: string;
}

interface AccountData {
  access_token?: string;
  id_token?: string;
  provider?: string;
}

/**
 * Send user authentication data to the backend after successful Google login
 * This is a server-side implementation for NextAuth callbacks
 */
export async function registerUserWithBackend(
  user: UserData,
  account: AccountData
): Promise<any> {
  try {
    // Validate BACKEND_URL environment variable
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      console.error('BACKEND_URL environment variable is not set');
      return { id: null };
    }

    // Only validate URL format if we're in a runtime environment (not build time)
    if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
      try {
        new URL(backendUrl);
      } catch (error) {
        console.error('Invalid BACKEND_URL format:', backendUrl);
        return { id: null };
      }
    }
    
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        given_name: user.given_name || user.name?.split(' ')[0] || '',
        family_name: user.family_name || user.name?.split(' ').slice(1).join(' ') || '',
        id_token: account.id_token
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend auth failed: ${response.status}`);
    }

    // Return the raw response data - assuming it contains an 'id' field directly
    const data = await response.json();
    
    // Make sure the ID exists and is returned properly
    if (!data.id) {
      console.error("Backend response missing ID field:", data);
    }
    
    return data;
  } catch (error) {
    console.error('Backend authentication error:', error);
    // Don't throw error to prevent blocking the auth flow
    // Just log it and continue
    return { id: null };
  }
} 