@echo off
chcp 65001 >nul
title Sistema de Evaluaciones Orales - Configuración

echo.
echo ========================================
echo   Configuración Inicial
echo ========================================
echo.

REM Verificar si PowerShell está disponible
where powershell >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: PowerShell no está disponible
    pause
    exit /b 1
)

REM Ejecutar el script de PowerShell
powershell.exe -ExecutionPolicy Bypass -File "%~dp0setup.ps1"

pause
