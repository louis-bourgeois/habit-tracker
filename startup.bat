@echo off
REM Lancer le serveur dans une nouvelle fenêtre
start "Server" cmd /c "cd /d C:\habit-tracker\server && npm run dev"

REM Lancer le front-end dans une nouvelle fenêtre
start "Frontend" cmd /c "cd /d C:\chemin\vers\habit-tracker && npm run dev"
