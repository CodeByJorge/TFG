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
  Write-Error 'Docker Desktop no esta listo. Abre Docker Desktop y espera a que el motor Linux termine de iniciar antes de detener el stack.'
  exit 1
}

Write-Host 'Deteniendo stack Docker...'
Invoke-DockerCommand -Arguments @('compose', 'down')
Write-Host 'Listo.'
