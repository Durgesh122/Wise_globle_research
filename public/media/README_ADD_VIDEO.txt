Place your Trading.mp4 file in this folder so the app can serve it at /media/Trading.mp4

If the file is on your local machine (example path C:\Downloads\Trading.mp4), run in the repo root PowerShell:

New-Item -ItemType Directory -Force -Path .\public\media; Copy-Item -Path C:\path\to\Trading.mp4 -Destination .\public\media\Trading.mp4

After copying, restart the dev server if it's running.