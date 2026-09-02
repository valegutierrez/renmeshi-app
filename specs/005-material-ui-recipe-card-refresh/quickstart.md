# Quickstart: Material UI Theme and Recipe Card Refresh

## Prerequisites

- Node.js and npm installed.
- Dependencies installed with `npm install`.
- Local server credentials configured in the ignored `.env` file for Backstage browser checks.
- Playwright Chromium installed with `npx playwright install chromium`.

Never print or commit credential values.

Recipe images are written to generated files under `data/uploads/recipes/` and referenced from
recipe JSON by opaque keys. The server's bounded multipart parser validates file signatures,
content types, byte limits, and decoded dimensions before persistence; upload files are runtime
data and remain ignored by Git.

## Run the Application

Start the frontend and API in separate terminals:

```bash
npm run dev
npm run server
```

Open the Vite URL, normally `http://localhost:5173`.

## Validation Scenarios

### Theme and Material UI

1. Open the homepage, recipe detail, About, sign-in, and Backstage routes.
2. Exercise light and dark schemes.
3. Confirm refreshed controls and cards use Material UI or approved local wrappers.
4. Confirm visible colors resolve through semantic tokens populated from `material-theme.json`.
5. Confirm no Bootstrap component, class, theme, utility, or override is present.
6. Verify Pixelpori labels use `On Surface` fill and a theme-derived approved white stroke.

### Recipe Image Lifecycle

1. Sign in as an administrator.
2. Create a recipe with a valid JPEG, PNG, or WebP image.
3. Confirm the recipe response and homepage card expose the generated image URL.
4. Attempt a create with a missing, unsupported, oversized, malformed, or truncated image.
5. Confirm the request fails with actionable feedback and no incomplete recipe is published.
6. Edit an existing recipe with a valid replacement image and confirm the public card updates.
7. Attempt an invalid replacement and confirm the old image, recipe, and audit history remain intact.
8. Request an unknown or traversal-style image key and confirm it is rejected.

### Recipe Cards and Category Assets

1. At desktop width, confirm every homepage recipe card uses its stored food image in the
   prominent media region and follows the attached mockup hierarchy.
2. At mobile width, confirm image prominence, text containment, readable action labels, and no
   horizontal overflow.
3. Confirm category pixel-art files appear only in the homepage category section and header
   Recipes dropdown, never as recipe-card images.

## Automated Checks

```bash
npm run lint
npm run typecheck:server
npm run build
npm test
npm run test:browser
```

Focused checks should include:

- Upload integration tests for validation, persistence, serving, replacement, and rollback.
- Browser Backstage checks for selecting an image and seeing it on the public card.
- Browser discovery checks for stored card images, restricted asset exclusion, hierarchy, and
  responsive overflow.
- Light/dark theme checks for Material UI token resolution, contrast, focus, and asset parity.

The repository intentionally uses the existing bounded multipart parser rather than adding a
third-party parser dependency. Keep that boundary covered when changing upload handling.

Expected result: all checks pass, and no source audit reports Bootstrap usage, hard-coded colors,
custom palette variants, opacity effects, gradients, category pixel-art usage in recipe cards, or
missing recipe images.
