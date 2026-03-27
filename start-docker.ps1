$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

function Invoke-DockerCommand {
  param(
    [Parameter(Mandatory = $true)]
    [string[]]$Arguments
  )

  & docker @Arguments
  if ($LASTEXITCODE -ne 0) {
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

Write-Host ''
Write-Host 'Listo.'
Write-Host 'Frontend: http://localhost:8081'
Write-Host 'Backend:  http://localhost:8000'
Write-Host 'DB:       localhost:3306'
