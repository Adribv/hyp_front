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

  // Validate BACKEND_URL format
  const backendUrl = process.env.BACKEND_URL;
  if (backendUrl) {
    try {
      new URL(backendUrl);
    } catch (error) {
      console.error('Invalid BACKEND_URL format:', backendUrl);
    }
  }

  return missing.length === 0;
}

// Call validation during module load
if (typeof window === 'undefined') {
  validateEnvVars();
}
