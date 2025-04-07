@echo off

REM Exécution de la commande build:ui
echo Building UI...
call npm run build:ui
if %errorlevel% neq 0 (
    echo UI build failed.
    exit /b %errorlevel%
)
echo UI build succeeded.

REM Exécution de la commande npm start dans le même terminal
echo Starting server...
call npm start
if %errorlevel% neq 0 (
    echo Server start failed.
    exit /b %errorlevel%
)
echo Server started successfully.