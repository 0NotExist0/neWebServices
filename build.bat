@echo off
chcp 65001 >nul
title Atelier Boutique - Build di Produzione
color 0B

echo ================================================================
echo           COMPILAZIONE PRODUZIONE (NEXT.JS BUILD)
echo ================================================================
echo.
echo Avvio compilazione per verificare che tutto sia pronto per Vercel...
echo.

call npm run build

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ================================================================
    echo   BUILD COMPLETATA CON SUCCESSO!
    echo   Il sito e pronto per il deploy su Vercel e GitHub.
    echo ================================================================
) else (
    color 0C
    echo.
    echo ================================================================
    echo   ERRORE DURANTE LA BUILD. Verifica i messaggi sopra.
    echo ================================================================
)

echo.
pause
