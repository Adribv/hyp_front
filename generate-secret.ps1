# PowerShell script to generate NEXTAUTH_SECRET
Write-Host "Generating NEXTAUTH_SECRET..." -ForegroundColor Green

# Generate a random 32-byte key and convert to base64
$bytes = New-Object Byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$secret = [Convert]::ToBase64String($bytes)

Write-Host "Generated NEXTAUTH_SECRET: $secret" -ForegroundColor Yellow
Write-Host ""
Write-Host "Copy this value to your .env.local file" -ForegroundColor Cyan 