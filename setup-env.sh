#!/bin/bash

echo "Setting up environment variables for SensAI..."

# Generate NEXTAUTH_SECRET
echo "Generating NEXTAUTH_SECRET..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Create frontend .env.local file
echo "Creating frontend .env.local file..."
cat > .env.local << EOF
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# Google OAuth (your actual credentials)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Backend Configuration
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Judge0 API (for code execution)
JUDGE0_API_URL=http://localhost:2358
EOF

echo "Frontend .env.local file created successfully!"
echo ""
echo "IMPORTANT: You still need to:"
echo "1. Add redirect URIs to Google Cloud Console:"
echo "   - http://localhost:3000/api/auth/callback/google"
echo "2. Create backend .env file in sensai-ai directory"
echo "3. Add your OpenAI API key to the backend .env file"
echo ""
echo "Generated NEXTAUTH_SECRET: $NEXTAUTH_SECRET" 