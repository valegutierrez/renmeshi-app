# Quickstart: About Us and Homepage Category Showcase

## Prerequisites

- Node.js and npm installed.
- Dependencies installed with `npm install`.
- An approved creator portrait added at the asset path selected during implementation. The current repository does not contain this portrait.

## Run

```bash
npm run dev
```

Open the Vite URL shown in the terminal, then exercise these routes:

- `#/` for the homepage
- `#/about` for About Us
- `#/recipe/miso-butter-noodles` to confirm existing recipe detail behavior

## Responsive validation

Use browser responsive mode at 1440 px, 1024 px, 800 px, 520 px, 375 px, and 320 px widths.

1. On `#/`, verify the header, pattern-backed latest-recipes section, explanation section, category panel, and teal footer appear in that order.
2. At desktop width, verify latest recipes use a horizontal card/action arrangement and categories use four equal columns inside a centered panel.
3. At mobile width, verify recipe cards, category items, and footer content stack without horizontal scroll or overlap.
4. On `#/about`, verify desktop image-left/story-right composition and mobile image-above/story composition.
5. Verify the portrait remains cropped inside a stable rounded frame and body copy wraps without clipping.

## Interaction validation

1. Activate About us from the shared header and confirm the hash route changes to `#/about`.
2. Activate each category item in order and confirm the recipe collection opens with `Appetizers`, `Mains`, `Sides`, or `Desserts` selected as appropriate.
3. Use keyboard Tab navigation to reach the menu control, About us link, category items, and footer links; verify each has a visible focus indicator.
4. Temporarily disable or replace one category image request and verify its accessible label and destination remain available.
5. Toggle light/dark theme and reload; confirm both pages retain the selected theme and maintain readable contrast.

## Automated checks

```bash
npm run lint
npm run build
```

Expected outcomes: both commands exit successfully, TypeScript emits no errors, and the Vite production build completes. Browser checks should additionally report no horizontal overflow at 320 px, no console errors, and no missing required asset requests.

See [data-model.md](data-model.md) for category and content validation rules and [contracts/ui-and-routing.md](contracts/ui-and-routing.md) for the browser-visible route and accessibility contract.

## Validation Record

Feature validation completed at 1440 px and 320 px. The homepage renders the required
latest-recipes, explanation, category, and footer sequence; About Us renders the portrait,
story, statement band, and footer; category links select the matching existing filter; the
mobile menu opens by keyboard-accessible button; and both tested widths report no horizontal
overflow. The existing automated suite, TypeScript checks, production build, server typecheck,
and lint all pass. Lint retains the pre-existing Fast Refresh warning in
`src/app/theme/theme-provider.tsx`.
