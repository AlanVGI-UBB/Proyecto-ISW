# ====================================
# Script para Detener el Proyecto
# Sistema de Evaluaciones Orales
# ====================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deteniendo Servidores" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Buscar y detener procesos de Node.js relacionados con el proyecto
Write-Host "Buscando procesos activos..." -ForegroundColor Yellow

$backendPath = (Resolve-Path "backend").Path
$frontendPath = (Resolve-Path "frontend").Path

# Obtener procesos de Node.js
$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    Write-Host ""
    Write-Host "Procesos Node.js encontrados:" -ForegroundColor Cyan
    
    $stopped = 0
    foreach ($process in $nodeProcesses) {
        $processPath = $process.Path
        Write-Host "  - PID: $($process.Id) | Path: $processPath" -ForegroundColor Gray
        
        # Intentar detener el proceso
        try {
            Stop-Process -Id $process.Id -Force -ErrorAction Stop
            $stopped++
            Write-Host "    ✓ Proceso detenido" -ForegroundColor Green
        } catch {
            Write-Host "    ⚠ No se pudo detener el proceso" -ForegroundColor Yellow
        }
    }
    
    Write-Host ""
    if ($stopped -gt 0) {
        Write-Host "✓ Se detuvieron $stopped proceso(s)" -ForegroundColor Green
    }
} else {
    Write-Host "No se encontraron procesos Node.js activos" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Proceso completado" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Si las ventanas de PowerShell siguen abiertas," -ForegroundColor Cyan
Write-Host "ciérralas manualmente." -ForegroundColor Cyan
Write-Host ""
