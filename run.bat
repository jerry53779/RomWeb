@echo off
title Antigravity Experience Launcher
echo =========================================================
echo   Antigravity Scroll-Driven Storytelling Experience
echo =========================================================
echo.

:: Ensure command runs relative to this batch file's folder
cd /d "%~dp0"

:: Verify Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed on this system.
    echo Please download and install Node.js from https://nodejs.org/ before running this.
    echo.
    pause
    exit /b
)

:: Check for node_modules, install if missing
if not exist node_modules (
    echo [System] node_modules not found. Installing dependencies, please wait...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Dependency installation failed.
        pause
        exit /b
      )
)

echo.
echo [System] Starting Vite development server...
echo [System] Opening your browser at http://localhost:3000...
echo.

:: Starts Vite dev server and opens the browser
call npm run dev -- --open

pause
