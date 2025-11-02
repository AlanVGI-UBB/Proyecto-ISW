# ====================================
# Script de Verificación del Sistema
# Sistema de Evaluaciones Orales
# ====================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Verificación del Sistema" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# 1. Verificar Node.js
Write-Host "[1/6] Verificando Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
    
    # Verificar versión mínima (v18)
    $version = $nodeVersion -replace 'v', '' -replace '\..*', ''
    if ([int]$version -ge 18) {
        Write-Host "  ✓ Versión compatible" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Versión antigua. Se recomienda v18 o superior" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ✗ Node.js no está instalado" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# 2. Verificar npm
Write-Host "[2/6] Verificando npm..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "  ✓ npm instalado: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "  ✗ npm no está instalado" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# 3. Verificar PostgreSQL
Write-Host "[3/6] Verificando PostgreSQL..." -ForegroundColor Yellow
if (Get-Command psql -ErrorAction SilentlyContinue) {
    $pgVersion = psql --version
    Write-Host "  ✓ PostgreSQL instalado: $pgVersion" -ForegroundColor Green
} else {
    Write-Host "  ⚠ PostgreSQL no encontrado en PATH" -ForegroundColor Yellow
    Write-Host "    Asegúrate de que PostgreSQL esté instalado y corriendo" -ForegroundColor Gray
}

Write-Host ""

# 4. Verificar estructura de carpetas
Write-Host "[4/6] Verificando estructura del proyecto..." -ForegroundColor Yellow
$requiredFolders = @("backend", "frontend")
$foldersOk = $true

foreach ($folder in $requiredFolders) {
    if (Test-Path $folder) {
        Write-Host "  ✓ Carpeta '$folder' encontrada" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Carpeta '$folder' no encontrada" -ForegroundColor Red
        $foldersOk = $false
        $allGood = $false
    }
}

Write-Host ""

# 5. Verificar dependencias
Write-Host "[5/6] Verificando dependencias..." -ForegroundColor Yellow

if (Test-Path "backend\node_modules") {
    Write-Host "  ✓ Dependencias del Backend instaladas" -ForegroundColor Green
} else {
    Write-Host "  ✗ Dependencias del Backend no instaladas" -ForegroundColor Red
    Write-Host "    Ejecuta: .\install.ps1" -ForegroundColor Gray
    $allGood = $false
}

if (Test-Path "frontend\node_modules") {
    Write-Host "  ✓ Dependencias del Frontend instaladas" -ForegroundColor Green
} else {
    Write-Host "  ✗ Dependencias del Frontend no instaladas" -ForegroundColor Red
    Write-Host "    Ejecuta: .\install.ps1" -ForegroundColor Gray
    $allGood = $false
}

Write-Host ""

# 6. Verificar configuración
Write-Host "[6/6] Verificando configuración..." -ForegroundColor Yellow

if (Test-Path "backend\.env") {
    Write-Host "  ✓ Archivo .env encontrado" -ForegroundColor Green
    
    # Leer y verificar variables importantes
    $envContent = Get-Content "backend\.env" -Raw
    
    if ($envContent -match "DB_PASSWORD=\w+") {
        Write-Host "  ✓ DB_PASSWORD configurado" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ DB_PASSWORD no configurado o vacío" -ForegroundColor Yellow
        Write-Host "    Edita backend\.env con tu contraseña de PostgreSQL" -ForegroundColor Gray
    }
    
    if ($envContent -match "JWT_SECRET=\w+") {
        Write-Host "  ✓ JWT_SECRET configurado" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ JWT_SECRET no configurado o vacío" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ✗ Archivo .env no encontrado" -ForegroundColor Red
    Write-Host "    Ejecuta: .\install.ps1" -ForegroundColor Gray
    $allGood = $false
}

Write-Host ""

# Verificar archivos importantes
$backendFiles = @(
    "backend\src\server.js",
    "backend\src\config\database.js",
    "backend\package.json"
)

$frontendFiles = @(
    "frontend\src\main.jsx",
    "frontend\src\App.jsx",
    "frontend\package.json"
)

$missingFiles = @()
foreach ($file in ($backendFiles + $frontendFiles)) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "⚠ Archivos importantes faltantes:" -ForegroundColor Yellow
    foreach ($file in $missingFiles) {
        Write-Host "  - $file" -ForegroundColor Gray
    }
    Write-Host ""
}

# Resumen final
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Resumen de Verificación" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($allGood -and $missingFiles.Count -eq 0) {
    Write-Host "✓ SISTEMA LISTO PARA USAR" -ForegroundColor Green
    Write-Host ""
    Write-Host "Puedes iniciar el proyecto con:" -ForegroundColor Cyan
    Write-Host "  .\start.ps1" -ForegroundColor White
} else {
    Write-Host "⚠ SISTEMA NECESITA CONFIGURACIÓN" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Pasos recomendados:" -ForegroundColor Cyan
    
    if (-not (Test-Path "backend\node_modules") -or -not (Test-Path "frontend\node_modules")) {
        Write-Host "  1. Instalar dependencias: .\install.ps1" -ForegroundColor White
    }
    
    if (-not (Test-Path "backend\.env")) {
        Write-Host "  2. Configurar archivo .env en backend\" -ForegroundColor White
    }
    
    Write-Host "  3. Crear base de datos en PostgreSQL" -ForegroundColor White
    Write-Host "  4. Ejecutar: .\start.ps1" -ForegroundColor White
}

Write-Host ""
