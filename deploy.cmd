@echo off
rem Double-click to deploy Automotion to the server (https://quoteled.io/automotion).
rem Uploads the code, rebuilds it there and restarts the services. The server's
rem database, accounts and settings are kept.
rem
rem   deploy.cmd            deploy
rem   deploy.cmd -Check     only test the connection to the server
setlocal
echo.
echo  Deploying Automotion to https://quoteled.io/automotion
echo  ------------------------------------------------------
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy\deploy.ps1" -PublicOrigin "https://quoteled.io" %*
set "RESULT=%ERRORLEVEL%"
echo.
if "%RESULT%"=="0" (
    if /i "%~1"=="-Check" (
        echo  The server accepts this PC's key. Ready to deploy.
    ) else (
        echo  Done. Live at https://quoteled.io/automotion
    )
) else (
    echo  The deploy did not finish - see the messages above.
)
echo.
if "%~1"=="" pause
exit /b %RESULT%
