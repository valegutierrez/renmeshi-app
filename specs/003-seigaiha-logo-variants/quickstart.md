# Quickstart: Canonical Seigaiha and Logo Color Variants

## Prerequisites

- Node.js and npm are installed.
- Dependencies are installed with `npm install`.
- Run commands from the repository root.

## Static Validation

```sh
npm run lint
npm run build
npm test
```

Expected outcome: lint, TypeScript/Vite build, and unit tests pass. Source-level checks identify only `src/assets/seigaiha-pattern.svg` for seigaiha surfaces and allow only `Outline Variant`, `Primary`, and `On Primary` bindings required by the visual contract.

## Browser Validation

Start the application using the project’s normal development commands, then run:

```sh
npm run test:browser
```

Expected outcomes:

1. The homepage and any existing seigaiha surfaces display the canonical `src/assets/seigaiha-pattern.svg` pattern.
2. The footer background resolves to Material Theme `Primary`, and its square `src/assets/renmeshi.svg` logo resolves to `On Primary`.
3. The header continues to display `src/assets/renmeshi letters.svg` as the wordmark.
4. Light, dark, medium-contrast, and high-contrast checks show the correct semantic bindings and WCAG AA contrast.
5. Desktop and narrow mobile checks show no clipping, distortion, or horizontal overflow.

## Focused Review References

- Requirements and acceptance scenarios: [spec.md](spec.md)
- Design decisions: [research.md](research.md)
- Visual interface rules: [contracts/ui-visual-contract.md](contracts/ui-visual-contract.md)
- Visual entities and invariants: [data-model.md](data-model.md)
