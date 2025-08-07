@echo off
echo Creating environment files for SensAI...

echo Creating frontend .env.local file...
(
echo # NextAuth Configuration
echo NEXTAUTH_URL=http://localhost:3000
echo NEXTAUTH_SECRET=mysecretkey123456789012345678901234567890
echo.
echo # Google OAuth ^(your actual credentials^)
echo GOOGLE_CLIENT_ID=your-google-client-id-here
echo GOOGLE_CLIENT_SECRET=your-google-client-secret-here
echo.
echo # Backend Configuration
echo BACKEND_URL=http://localhost:8000
echo NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
echo NEXT_PUBLIC_APP_URL=http://localhost:3000
echo.
echo # Judge0 API ^(for code execution^)
echo JUDGE0_API_URL=http://localhost:2358
) > .env.local

echo Frontend .env.local file created successfully!
echo.
echo IMPORTANT: You still need to:
echo 1. Add redirect URIs to Google Cloud Console:
echo    - http://localhost:3000/api/auth/callback/google
echo 2. Create backend .env file in sensai-ai directory
echo 3. Add your OpenAI API key to the backend .env file
echo.
pause 