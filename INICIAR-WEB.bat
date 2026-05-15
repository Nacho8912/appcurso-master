@echo off
title AgentesPro - Servidor local
cd /d "%~dp0"
echo.
echo  ============================================
echo   AgentesPro - Iniciando la web en tu PC
echo  ============================================
echo.
echo  Carpeta del proyecto: %cd%
echo.
if not exist "node_modules\" (
    echo  Instalando dependencias la primera vez...
    call npm install
)
echo  Abriendo http://localhost:3000 en el navegador...
echo  IMPORTANTE: NO CIERRES ESTA VENTANA NEGRA mientras uses la web.
echo  Si la cierras, la pagina dejara de funcionar (error de conexion).
echo.
echo  Para detener la web: cierra esta ventana o pulsa Ctrl+C
echo.
start "" "http://localhost:3000/login"
call npm run dev
