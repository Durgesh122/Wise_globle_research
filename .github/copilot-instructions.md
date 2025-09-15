# Copilot Instructions for Wise Global Research Services

## Quick Summary
- React frontend (CRA-like) in `src/` with server helpers in `server/` and Firebase Functions in `functions/`.
- Build artifacts land in top-level `build/` and `public/` mirrors are used for static hosting.

## Architecture & Big Picture
- **Frontend:** Single-page React app under `src/` (entry: `src/index.js`, app root: `src/App.js`). Styling uses Tailwind (`tailwind.config.js`) and PostCSS (`postcss.config.js`). i18n uses `i18next` with resources in `src/locales/*.json` (`src/i18n.js`).
- **Server:** Lightweight Express server in `server/index.js` (runs on PORT, default 3001). Exposes `/health`, `/api/*` and `/send-email`. Uses Firebase Admin SDK for auth checks and nodemailer for SMTP. Watch `server/index.js` for CORS/headers and rate-limiting behaviour.
- **Cloud Functions:** Firebase Cloud Functions in `functions/index.js` (emailing popup submissions). Functions rely on `functions.config()` for SMTP and admin email configuration and include a scheduled job.

## Developer Workflows (concrete commands)
- **Install:** `npm ci` or `npm install` in repository root.
- **Run frontend (dev):** `npm start` — local CRA dev server on port 3000.
- **Run server (dev):** `node server/index.js` (or use `npx nodemon server/index.js`). Server listens on `process.env.PORT || 3001`.
- **Build (prod):** `npm run build` — outputs to `build/`.
- **Tests & demos:** `npm test` (interactive). Additional scripts and example tests live in `t/` and `contrib/filter-repo-demos/`.
- **Deploy to Firebase Hosting:** `npm run deploy:hosting` (reads `firebase.json`). For Functions, use `firebase deploy --only functions` and set `functions:config:set` for SMTP credentials.

## Environment & Secrets (what to set)
- Frontend envs: `NODE_ENV`, typical CRA vars (see `.env` patterns if added).
- Server envs: `PORT`, `FIREBASE_DATABASE_URL` (optional fallback exists), `SMTP_SERVER`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `INFO_EMAIL_TO`, `SUPPORT_EMAIL_TO`, `CAREER_EMAIL`.
- Functions config: use `firebase functions:config:set smtp.host="..." smtp.port="..." smtp.user="..." smtp.pass="..." admin.email="a@b.com"`.

## Project-specific Patterns & Conventions
- **Localization files:** `src/locales/*.json` are authoritative. Build fails on malformed JSON — validate before PR.
- **Babel & build tweaks:** `craco.config.js` removes `console.*` in production except `error` and `warn`. Do not rely on console logs in prod artifacts.
- **Server security headers & CSP:** `server/index.js` sets a pragmatic CSP and strict Referrer/Permissions policies — modify only with security review.
- **Email flow:** Two email systems exist: site server (`/send-email`) uses env SMTP and Firebase Function `emailPopupSubmissions` (uses `functions.config()`). Local dev falls back to Ethereal in `server/index.js` when SMTP unset.

## Notable Code Examples (where to look)
- i18n initialization: `src/i18n.js` (uses `i18next-browser-languagedetector`, `initReactI18next`).
- Build override example: `craco.config.js` (Tailwind and transform-remove-console in production).
- Express APIs & admin auth: `server/index.js` — look for `requireAdminAuth` and routes `/api/submit-client-form` and `/send-email`.
- Cloud function example: `functions/index.js` — `emailPopupSubmissions` and `scheduledEmailPopupSubmissions` show realtime DB access + SMTP usage.

## Testing & Debugging Tips
- If a production build fails, first validate JSON in `src/locales`:
  - PowerShell: `node -e "JSON.parse(require('fs').readFileSync('src/locales/en.json'))"`
- To debug email sending locally, set SMTP env vars or observe Ethereal preview URLs (server prints preview URL when SMTP missing in non-prod).
- For firebase function debugging, run emulators: `firebase emulators:start --only functions,database` and set `functions.config` accordingly.

## When Editing or Adding Features
- Prefer functional React components and hooks; follow existing `src/components/` conventions.
- For server-side changes, preserve CSP, CORS, and rate-limiting patterns in `server/index.js` unless you intentionally change API surface.
- When adding new translations: add `src/locales/<lang>.json`, keep keys consistent with `en.json`, and add resource registration in `src/i18n.js` if you want it bundled.

## CI / Deployment Notes
- Hosting: `firebase.json` maps `build/` static assets — ensure `npm run build` completes and `build/` contains `_redirects` and `index.html` before deploying.
- Functions require `firebase functions:config:set` for SMTP and other secrets; scheduled function timezone is `Asia/Kolkata`.

## Files/Dirs to Review in PRs
- `src/locales/*` — JSON validity and missing keys.
- `craco.config.js`, `config-overrides.js` — build changes.
- `server/index.js` — headers, auth, SMTP logic.
- `functions/index.js` — scheduled job and `functions.config` usage.

---

If anything is unclear or you want more examples (e.g., local run scripts, emulator commands, or a checklist for PRs), tell me which area to expand.
