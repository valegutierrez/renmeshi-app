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

To run the API in Docker while keeping recipe metadata and uploaded images on your machine:

```bash
docker compose -f docker-compose.dev.yml up --build
```

The frontend still runs with `npm run dev` at `http://localhost:5173`; the container publishes
the API at `http://localhost:3001`. The `./data:/app/data` bind mount persists
`data/recipes.json` and generated images under `data/uploads/recipes/`. Stop the container with
`docker compose -f docker-compose.dev.yml down`; do not remove the `data/` directory unless you
intend to delete local recipe data and images.

Open the Vite URL, normally `http://localhost:5173`. The API runs at
`http://localhost:3001`; set `VITE_API_BASE_URL` if it runs elsewhere.

Configure Backstage credentials, the datastore, and the port in the local `.env` file
before running `npm run server`. The server refuses authentication when the admin
credentials are not configured. Keep `.env` out of GitHub; never commit it or paste its
values into documentation. Recipe data is stored under `data/`, which is ignored by Git.
Administrator-uploaded recipe images are stored as generated files under
`data/uploads/recipes/` by default. Recipe JSON stores only validated image metadata and an
opaque serving URL; the upload directory is runtime data and must not be committed.
New local stores start empty; startup migration removes only the bundled starter recipe IDs from
an existing store while preserving recipes created by administrators.
The server uses its bounded multipart parser and signature/dimension validation so uploads do
not depend on a browser-provided MIME type or a third-party parser.

Available checks:

```bash
npm run lint
npm run build
npm test
npm run test:browser
```

Palette changes must use the Material Theme roles defined in
[the color contract](specs/004-material-theme-color-audit/contracts/ui-color-contract.md).
The source audit is covered by `npm test -- tests/unit/color-policy.test.ts`, while
light/dark readability and overflow are covered by
`npm run test:browser -- tests/browser/color-audit.spec.ts`. The constitution remains
the governing policy for any proposed color exception.

`test:browser` starts the configured Vite and API servers automatically when they are not
already running, loading credentials from the local `.env`. Install Playwright Chromium
once with `npx playwright install chromium`.
