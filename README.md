# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Renmeshi development

Install dependencies with `npm install`. Run the frontend and API in separate terminals:

```bash
npm run dev
npm run server
```

Open the Vite URL, normally `http://localhost:5173`. The API runs at
`http://localhost:3001`; set `VITE_API_BASE_URL` if it runs elsewhere.

Configure Backstage credentials, the datastore, and the port in the local `.env` file
before running `npm run server`. The server refuses authentication when the admin
credentials are not configured. Keep `.env` out of GitHub; never commit it or paste its
values into documentation. Recipe data is stored under `data/`, which is ignored by Git.

Available checks:

```bash
npm run lint
npm run build
npm test
npm run test:browser
```

`test:browser` starts the configured Vite and API servers automatically when they are not
already running, loading credentials from the local `.env`. Install Playwright Chromium
once with `npx playwright install chromium`.
