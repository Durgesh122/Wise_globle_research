Digio proxy
==============

This is a tiny Node/Express proxy that forwards sign request payloads from the frontend to Digio's API using server-side credentials.

Setup
------
1. Copy `.env.example` to `.env` and set `DIGIO_AUTH_BASIC` to your Digio Basic auth value (the base64 part after `Basic `).

2. Install dependencies and run:

```powershell
cd server
npm install
$env:DIGIO_AUTH_BASIC='BASE64_CREDS_HERE'
node digio-proxy.js
```

Or use the example `.env` file with a tool like `dotenv` or your process manager.

Test
-----
Health check:

```powershell
Invoke-RestMethod -Uri 'http://localhost:3001/health' -Method Get
```

Test proxy (example payload):

```powershell
Invoke-RestMethod -Uri 'http://localhost:3001/api/digio' -Method Post -Body (@{test=1} | ConvertTo-Json) -ContentType 'application/json'
```
News API proxy
----------------
If you have a NewsAPI key, set `NEWSAPI_KEY` in the server env and call:

```powershell
Invoke-RestMethod -Uri 'http://localhost:3001/api/news' -Method Get
```

Economic calendar
------------------
The server exposes `/api/economic`. Without parameters it returns mock events. You can pass an external url via `?url=` to proxy that API (use with care).


Security
--------
- Never commit your `DIGIO_AUTH_BASIC` into source control.
- In production restrict CORS origins and run behind HTTPS.
