# ====================================
# Script de Configuración Inicial
# Sistema de Evaluaciones Orales
# ====================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Configuración Inicial del Proyecto" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Este script te ayudará a configurar el proyecto paso a paso." -ForegroundColor White
Write-Host ""

# Paso 1: Verificar Node.js
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Paso 1: Verificar requisitos" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js no está instalado" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "y ejecuta este script nuevamente." -ForegroundColor Yellow
    Write-Host ""
    Pause
    exit 1
}

Write-Host ""

# Paso 2: Instalar dependencias
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Paso 2: Instalar dependencias" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$install = Read-Host "¿Deseas instalar las dependencias ahora? (S/N)"
if ($install -eq "S" -or $install -eq "s" -or $install -eq "") {
    Write-Host ""
    Write-Host "Instalando dependencias del Backend..." -ForegroundColor Cyan
    Set-Location backend
    npm install
    Set-Location ..
    Write-Host "✓ Backend listo" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Instalando dependencias del Frontend..." -ForegroundColor Cyan
    Set-Location frontend
    npm install
    Set-Location ..
    Write-Host "✓ Frontend listo" -ForegroundColor Green
} else {
    Write-Host "⚠ Dependencias no instaladas. Recuerda ejecutar: .\install.ps1" -ForegroundColor Yellow
}

Write-Host ""

# Paso 3: Configurar .env
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Paso 3: Configurar archivo .env" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path "backend\.env")) {
    if (Test-Path "backend\.env.example") {
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Host "✓ Archivo .env creado" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Necesitamos configurar las credenciales de PostgreSQL:" -ForegroundColor White
Write-Host ""

# Solicitar credenciales
$dbHost = Read-Host "Host de PostgreSQL (default: localhost)"
if ([string]::IsNullOrWhiteSpace($dbHost)) { $dbHost = "localhost" }

$dbPort = Read-Host "Puerto de PostgreSQL (default: 5432)"
if ([string]::IsNullOrWhiteSpace($dbPort)) { $dbPort = "5432" }

$dbUser = Read-Host "Usuario de PostgreSQL (default: postgres)"
if ([string]::IsNullOrWhiteSpace($dbUser)) { $dbUser = "postgres" }

$dbPassword = Read-Host "Contraseña de PostgreSQL" -AsSecureString
$dbPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword)
)

$dbName = Read-Host "Nombre de la base de datos (default: evaluaciones_orales)"
if ([string]::IsNullOrWhiteSpace($dbName)) { $dbName = "evaluaciones_orales" }

# Actualizar archivo .env
$envContent = @"
# Configuración del Servidor
PORT=4000
NODE_ENV=development

# Configuración de Base de Datos
DB_HOST=$dbHost
DB_PORT=$dbPort
DB_USERNAME=$dbUser
DB_PASSWORD=$dbPasswordPlain
DB_DATABASE=$dbName

# JWT Secret
JWT_SECRET=clave_secreta_desarrollo_2024_isw
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173
"@

Set-Content -Path "backend\.env" -Value $envContent
Write-Host ""
Write-Host "✓ Archivo .env configurado correctamente" -ForegroundColor Green

Write-Host ""

# Paso 4: Crear base de datos
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Paso 4: Base de datos" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Asegúrate de crear la base de datos en PostgreSQL:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  CREATE DATABASE $dbName;" -ForegroundColor White
Write-Host ""

$createDb = Read-Host "¿Ya creaste la base de datos? (S/N)"

Write-Host ""

# Resumen final
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ Configuración Completada" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Tu proyecto está configurado con:" -ForegroundColor Cyan
Write-Host "  - Host: $dbHost" -ForegroundColor White
Write-Host "  - Puerto: $dbPort" -ForegroundColor White
Write-Host "  - Usuario: $dbUser" -ForegroundColor White
Write-Host "  - Base de datos: $dbName" -ForegroundColor White
Write-Host ""
Write-Host "Próximo paso:" -ForegroundColor Cyan
Write-Host "  Ejecuta: .\start.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Para iniciar el proyecto y empezar a desarrollar." -ForegroundColor Gray
Write-Host ""

Pause
