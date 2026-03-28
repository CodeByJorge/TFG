$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

function Get-DockerComposePorts {
  $ports = @{ Backend = '8000'; Frontend = '8081'; Db = '3306' }
  $envPath = Join-Path $PSScriptRoot '.env'
  if (Test-Path $envPath) {
    Get-Content $envPath -ErrorAction SilentlyContinue | ForEach-Object {
      if ($_ -match '^\s*BACKEND_HOST_PORT\s*=\s*(\d+)') { $ports.Backend = $matches[1] }
      if ($_ -match '^\s*FRONTEND_HOST_PORT\s*=\s*(\d+)') { $ports.Frontend = $matches[1] }
      if ($_ -match '^\s*DB_HOST_PORT\s*=\s*(\d+)') { $ports.Db = $matches[1] }
    }
  }
  return $ports
}

function Invoke-DockerCommand {
  param(
    [Parameter(Mandatory = $true)]
    [string[]]$Arguments
  )

  & docker @Arguments
  if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host 'Puerto ocupado (p. ej. 8000): crea/edita .env en esta carpeta. Copia docker.env.example y ajusta BACKEND_HOST_PORT + VITE_API_BASE_URL, luego vuelve a ejecutar (con --build).' -ForegroundColor Yellow
    throw "Docker command failed: docker $($Arguments -join ' ')"
  }
}

Write-Host 'Comprobando Docker Desktop...'
& docker info *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Error 'Docker Desktop no esta listo. Abre Docker Desktop y espera a que el motor Linux termine de iniciar antes de ejecutar este script.'
  exit 1
}

Write-Host 'Arrancando stack Docker...'
Invoke-DockerCommand -Arguments @('compose', 'down')
Invoke-DockerCommand -Arguments @('compose', 'up', '-d', '--build')

$p = Get-DockerComposePorts
Write-Host ''
Write-Host 'Listo.'
Write-Host "Frontend: http://localhost:$($p.Frontend)"
Write-Host "Backend:  http://localhost:$($p.Backend)"
Write-Host "DB:       localhost:$($p.Db)"
if (-not (Test-Path (Join-Path $PSScriptRoot '.env'))) {
  Write-Host '(Sin .env se usan puertos por defecto: backend 8000.)' -ForegroundColor DarkGray
}
