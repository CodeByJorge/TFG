$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

Write-Host 'Arrancando stack Docker...'
docker compose down
docker compose up -d --build

Write-Host ''
Write-Host 'Listo.'
Write-Host 'Frontend: http://localhost:8081'
Write-Host 'Backend:  http://localhost:8000'
Write-Host 'DB:       localhost:3306'
