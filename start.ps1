# ====================================
# Script de Inicio Rapido
# Sistema de Evaluaciones Orales
# ====================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Sistema de Evaluaciones Orales" -ForegroundColor Cyan
Write-Host "  Iniciando proyecto..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js esta instalado
Write-Host "[1/4] Verificando Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "  [OK] Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Node.js no esta instalado" -ForegroundColor Red
    Write-Host "  Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar si las dependencias estan instaladas
Write-Host ""
Write-Host "[2/4] Verificando dependencias..." -ForegroundColor Yellow

$backendNodeModules = Test-Path "backend\node_modules"
$frontendNodeModules = Test-Path "frontend\node_modules"

if (-not $backendNodeModules -or -not $frontendNodeModules) {
    Write-Host "  [!] Dependencias no encontradas. Instalando..." -ForegroundColor Yellow
    Write-Host ""
    
    if (-not $backendNodeModules) {
        Write-Host "  Instalando dependencias del Backend..." -ForegroundColor Cyan
        Set-Location backend
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  [ERROR] Error al instalar dependencias del backend" -ForegroundColor Red
            Set-Location ..
            exit 1
        }
        Set-Location ..
        Write-Host "  [OK] Dependencias del Backend instaladas" -ForegroundColor Green
    }
    
    if (-not $frontendNodeModules) {
        Write-Host "  Instalando dependencias del Frontend..." -ForegroundColor Cyan
        Set-Location frontend
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  [ERROR] Error al instalar dependencias del frontend" -ForegroundColor Red
            Set-Location ..
            exit 1
        }
        Set-Location ..
        Write-Host "  [OK] Dependencias del Frontend instaladas" -ForegroundColor Green
    }
} else {
    Write-Host "  [OK] Dependencias ya instaladas" -ForegroundColor Green
}

# Verificar archivo .env
Write-Host ""
Write-Host "[3/4] Verificando configuracion..." -ForegroundColor Yellow
if (Test-Path "backend\.env") {
    Write-Host "  [OK] Archivo .env encontrado" -ForegroundColor Green
} else {
    Write-Host "  [!] Archivo .env no encontrado" -ForegroundColor Yellow
    if (Test-Path "backend\.env.example") {
        Write-Host "  Creando .env desde .env.example..." -ForegroundColor Cyan
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Host "  [OK] Archivo .env creado" -ForegroundColor Green
        Write-Host "  [IMPORTANTE] Edita backend\.env con tus credenciales de PostgreSQL" -ForegroundColor Yellow
    }
}

# Iniciar servidores
Write-Host ""
Write-Host "[4/4] Iniciando servidores..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Servidores iniciandose..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Backend:  http://localhost:4000" -ForegroundColor Green
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "  Presiona Ctrl+C para detener los servidores" -ForegroundColor Yellow
Write-Host ""

# Iniciar Backend en una nueva ventana de PowerShell
Write-Host "Iniciando Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host 'BACKEND - Sistema de Evaluaciones Orales' -ForegroundColor Green; Write-Host ''; npm run dev"

# Esperar 3 segundos para que el backend inicie primero
Start-Sleep -Seconds 3

# Iniciar Frontend en una nueva ventana de PowerShell
Write-Host "Iniciando Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host 'FRONTEND - Sistema de Evaluaciones Orales' -ForegroundColor Blue; Write-Host ''; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  [OK] Proyecto iniciado correctamente" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Los servidores estan corriendo en ventanas separadas." -ForegroundColor Cyan
Write-Host "Abre tu navegador en: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para detener los servidores:" -ForegroundColor Yellow
Write-Host "  - Cierra las ventanas de PowerShell del Backend y Frontend" -ForegroundColor Yellow
Write-Host "  - O presiona Ctrl+C en cada ventana" -ForegroundColor Yellow
Write-Host ""
