# ====================================
# Script de Instalación de Dependencias
# Sistema de Evaluaciones Orales
# ====================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Instalación de Dependencias" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Error: Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Instalar dependencias del Backend
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Backend - Instalando dependencias" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location backend
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Dependencias del Backend instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "✗ Error al instalar dependencias del Backend" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..
Write-Host ""

# Instalar dependencias del Frontend
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Frontend - Instalando dependencias" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location frontend
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Dependencias del Frontend instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "✗ Error al instalar dependencias del Frontend" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..
Write-Host ""

# Crear archivo .env si no existe
if (-not (Test-Path "backend\.env")) {
    Write-Host "Creando archivo .env..." -ForegroundColor Yellow
    if (Test-Path "backend\.env.example") {
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Host "✓ Archivo .env creado desde .env.example" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠ IMPORTANTE:" -ForegroundColor Yellow
        Write-Host "  Edita el archivo backend\.env con tus credenciales de PostgreSQL" -ForegroundColor Yellow
        Write-Host "  Especialmente la línea: DB_PASSWORD=tu_contraseña" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ Instalación completada" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "  1. Crea la base de datos en PostgreSQL:" -ForegroundColor White
Write-Host "     CREATE DATABASE evaluaciones_orales;" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Edita backend\.env con tus credenciales" -ForegroundColor White
Write-Host ""
Write-Host "  3. Ejecuta el proyecto con:" -ForegroundColor White
Write-Host "     .\start.ps1" -ForegroundColor Gray
Write-Host ""
