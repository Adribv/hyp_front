# Environment Setup Guide

## OAuth Configuration Issues

### Problem: redirect_uri_mismatch Error

This error occurs when the redirect URIs configured in your Google Cloud Console don't match the ones your application is using.

### Solution Steps:

#### 1. Google Cloud Console Configuration

**IMPORTANT**: You need to add the following redirect URIs to your Google Cloud Console project "campus-life-final":

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project "campus-life-final"
3. Navigate to "APIs & Services" > "Credentials"
4. Find your OAuth 2.0 Client ID: `your-google-client-id-here`
5. Click "Edit" and add the following **Authorized redirect URIs**:

**For Development:**
```
http://localhost:3000/api/auth/callback/google
```

**For Production (replace with your actual domain):**
```
https://yourdomain.com/api/auth/callback/google
```

#### 2. Frontend Environment Variables

Create a `.env.local` file in the `sensai-frontend` directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (your actual credentials)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Backend Configuration
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Judge0 API (for code execution)
JUDGE0_API_URL=http://localhost:2358
```

#### 3. Backend Environment Variables

Create a `.env` file in the `sensai-ai` directory:

```env
# Google OAuth (your actual credentials)
GOOGLE_CLIENT_ID=your-google-client-id-here

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Optional: S3 Configuration (for production)
S3_BUCKET_NAME=your-s3-bucket
S3_FOLDER_NAME=your-s3-folder

# Optional: Error Tracking
BUGSNAG_API_KEY=your-bugsnag-key
ENV=development

# Optional: Slack Webhooks
SLACK_USER_SIGNUP_WEBHOOK_URL=your-slack-webhook
SLACK_COURSE_CREATED_WEBHOOK_URL=your-slack-webhook
SLACK_USAGE_STATS_WEBHOOK_URL=your-slack-webhook
```

### Important Notes:

1. **NEXTAUTH_URL**: Must match your application's base URL exactly
2. **NEXTAUTH_SECRET**: Generate a secure random string (see methods below)
3. **GOOGLE_CLIENT_ID**: Must be the same in both frontend and backend
4. **Redirect URIs**: Must include the exact path `/api/auth/callback/google`

### Generate NEXTAUTH_SECRET (Windows):

**Method 1: PowerShell Script**
```powershell
# Run the provided script
.\generate-secret.ps1
```

**Method 2: Online Generator (Temporary)**
Visit: https://generate-secret.vercel.app/32
Copy the generated string and use it as your NEXTAUTH_SECRET

**Method 3: Manual Generation**
Use this pre-generated secret (for development only):
```
mysecretkey123456789012345678901234567890
```

### Testing the Configuration:

1. Start your backend: `cd sensai-ai && python -m uvicorn src.api.main:app --reload`
2. Start your frontend: `cd sensai-frontend && npm run dev`
3. Navigate to `http://localhost:3000/login`
4. Try signing in with Google

### Common Issues:

- **Wrong redirect URI**: Double-check the URIs in Google Cloud Console
- **Missing environment variables**: Ensure all required variables are set
- **CORS issues**: Make sure your backend CORS configuration allows your frontend domain
- **Port conflicts**: Ensure ports 3000 (frontend) and 8000 (backend) are available

### Production Deployment:

For production, update the URLs to use your actual domain:

```env
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

And add the production redirect URI to Google Cloud Console:
```
https://yourdomain.com/api/auth/callback/google
``` 