@echo off
cls

REM Nettoyage complet
echo Cleaning previous installation...
call npm run clean
if %errorlevel% neq 0 (
    echo Cleaning failed but continuing...
)

REM Installation fraîche des dépendances
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Dependencies installation failed.
    exit /b %errorlevel%
)

REM Build de l'interface
echo Building UI...
call npm run build:ui
if %errorlevel% neq 0 (
    echo UI build failed.
    exit /b %errorlevel%
)

REM Démarrage en mode développement
echo Starting application...
call npm run dev
if %errorlevel% neq 0 (
    echo Development server start failed.
    exit /b %errorlevel%
)