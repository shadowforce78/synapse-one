@echo off
cls

@REM REM Nettoyage complet
@REM echo Cleaning previous installation...
@REM call npm run clean
@REM if %errorlevel% neq 0 (
@REM     echo Cleaning failed but continuing...
@REM )

@REM REM Installation fraîche des dépendances
@REM echo Installing dependencies...
@REM call npm install
@REM if %errorlevel% neq 0 (
@REM     echo Dependencies installation failed.
@REM     exit /b %errorlevel%
@REM )

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