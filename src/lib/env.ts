/**
 * Environment variable validation utility
 */

export function validateEnvVars() {
  const requiredVars = [
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'BACKEND_URL',
    'NEXT_PUBLIC_BACKEND_URL',
    'NEXT_PUBLIC_APP_URL'
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
  }

  // Only validate BACKEND_URL format in runtime environments
  const backendUrl = process.env.BACKEND_URL;
  if (backendUrl && typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    try {
      new URL(backendUrl);
    } catch (error) {
      console.error('Invalid BACKEND_URL format:', backendUrl);
    }
  }

  return missing.length === 0;
}

// Only call validation during runtime, not during build
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  validateEnvVars();
}
