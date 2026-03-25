$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

Write-Host 'Deteniendo stack Docker...'
docker compose down
Write-Host 'Listo.'
