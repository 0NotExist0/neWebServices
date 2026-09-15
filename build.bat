@echo off
chcp 65001 >nul
title NotExistShoppingPlace by 0Not_Exist0 - Build Produzione
color 0B

echo ================================================================
echo     NOTEXISTSHOPPINGPLACE - COMPILAZIONE PRODUZIONE VERCEL
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
