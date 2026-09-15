@echo off
chcp 65001 >nul
title NotExistShoppingPlace by 0Not_Exist0 - Dev Server
color 0A

echo ================================================================
echo       NOTEXISTSHOPPINGPLACE - BY 0NOT_EXIST0 (DRIVE SHOP)
echo ================================================================
echo.
echo [1/3] Verifica ambiente Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERRORE] Node.js non trovato!
    echo Scarica e installa Node.js da: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [2/3] Verifica dipendenze (node_modules)...
if not exist "node_modules\" (
    echo Cartella node_modules non trovata. Installazione in corso...
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo [ERRORE] Installazione fallita.
        pause
        exit /b 1
    )
) else (
    echo Dipendenze gia presenti.
)

echo.
echo [3/3] Avvio server Next.js...
echo.
echo ----------------------------------------------------------------
echo   Sito disponibile su: http://localhost:3000
echo   Per fermare il server premi: CTRL + C
echo ----------------------------------------------------------------
echo.

:: Apre automaticamente il browser dopo 2 secondi
start "" timeout /t 2 /nobreak >nul & start http://localhost:3000

:: Avvia il server Next.js
call npm run dev

pause
