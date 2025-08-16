# Copilot Instructions for Wise Global Research Services

## Project Overview
- This is a React-based front-end for Wise Global Research Services, focused on market research, analytics, and data-driven insights.
- The main app logic resides in `src/`, with components in `src/components/`, assets in `src/assets/`, and localization files in `src/locales/`.
- The project uses Create React App conventions, but includes custom configuration via `craco.config.js` and `config-overrides.js`.

## Developer Workflows
- **Development:** Use `npm start` to run the app locally on port 3000.
- **Production Build:** Use `npm run build` to generate optimized assets in the `build/` directory.
- **Testing:** Run `npm test` for interactive test mode. Test scripts and demos are in `t/` and `contrib/filter-repo-demos/`.
- **Deployment:** Use `npm run deploy:hosting` to build and deploy to Firebase Hosting. See `firebase.json` for hosting config.

## Key Patterns & Conventions
- **Localization:** All translations are stored in `src/locales/*.json`. Ensure these files are valid JSON; malformed files will break the build.
- **Component Structure:** Components are organized by feature in `src/components/`. Use functional components and hooks as the default pattern.
- **Custom Config:** App overrides are managed via `craco.config.js` and `config-overrides.js` for advanced Webpack and Babel settings.
- **Assets:** Static files (images, fonts) are in `src/assets/` and referenced via import or public URLs.
- **Testing Demos:** History rewriting and filter-repo demos are in `contrib/filter-repo-demos/` and require a symlink to `git_filter_repo.py` in your PYTHONPATH.

## Integration Points
- **Firebase:** Deployment and hosting are configured via `firebase.json`.
- **Tailwind CSS:** Styling is managed via `tailwind.config.js` and `postcss.config.js`.
- **i18n:** Internationalization logic is in `src/i18n.js`.

## Troubleshooting
- If the app fails to compile, check all JSON files in `src/locales/` for syntax errors.
- For custom build or deployment issues, review `craco.config.js`, `config-overrides.js`, and `firebase.json`.

## Example: Adding a New Locale
1. Create a new JSON file in `src/locales/` (e.g., `fr.json`).
2. Ensure the file is valid JSON and matches the structure of `en.json`.
3. Update `src/i18n.js` to include the new locale.

---

If any section is unclear or missing important details, please provide feedback to improve these instructions.
