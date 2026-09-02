@echo off
title ALBURQTEX - Pagina web
cd /d "%~dp0"

if not exist node_modules (
  echo Instalando dependencias por primera vez, esto puede tardar unos minutos...
  call npm install
  if errorlevel 1 (
    echo.
    echo Hubo un error instalando dependencias. Verifica que Node.js este instalado.
    pause
    exit /b 1
  )
)

echo.
echo Iniciando la pagina web de ALBURQTEX...
echo Se abrira sola en tu navegador. NO CIERRES esta ventana mientras la estes usando.
echo Para detenerla, cierra esta ventana o presiona Ctrl+C.
echo.

call npm run dev

pause
