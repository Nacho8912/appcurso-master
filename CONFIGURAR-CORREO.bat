@echo off
title Configurar correo AgentesPro
cd /d "%~dp0"
echo.
echo  Abriendo el archivo de configuracion de correo...
echo  Solo tienes que cambiar la linea SMTP_PASS por tu contrasena de aplicacion de Gmail.
echo.
notepad ".env.local"
echo.
echo  Cuando guardes y cierres el Bloc de notas, reinicia la web (cierra y vuelve a abrir ABRIR AGENTESPRO.bat).
pause
