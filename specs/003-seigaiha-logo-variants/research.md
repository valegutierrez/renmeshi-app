# Research: Canonical Seigaiha and Logo Color Variants

## Decision: Extend the existing semantic token layer

- **Decision**: Add Material Theme semantic equivalents for `Primary`, `On Primary`, and `Outline Variant` to the existing shared theme token layer, with values defined for light, dark, medium-contrast, and high-contrast modes.
- **Rationale**: The constitution requires one theme source of truth, while the current token file exposes only project-specific aliases and custom surface colors. Centralizing the missing semantics avoids component-level color exceptions and supports parity checks.
- **Alternatives considered**: Defining colors directly in `App.css` was rejected because it bypasses the shared theme layer and cannot guarantee mode parity. Introducing a new theme provider was rejected because an existing provider and bootstrap/storage flow already control theme state.

## Decision: Use the existing shell for logo integration

- **Decision**: Keep the header wordmark and square footer logo in `src/app/AppShell.tsx`; bind the footer surface to `Primary` and the square logo to `On Primary` there or through shared classes.
- **Rationale**: `AppShell` is the existing owner of both brand surfaces, so the smallest change preserves routing, accessibility labels, and responsive behavior.
- **Alternatives considered**: Duplicating logo components per page was rejected because it would create inconsistent asset and token bindings. Replacing the wordmark with the square logo was rejected because the constitution assigns distinct roles to the two approved assets.

## Decision: Use the canonical SVG as a CSS background image

- **Decision**: Apply `src/assets/seigaiha-pattern.svg` only to the existing decorative pattern surfaces that require a seigaiha treatment, with the element's color inherited from the `Outline Variant` semantic token.
- **Rationale**: The supplied SVG uses `fill:currentColor`, so a shared CSS color binding preserves the artwork while allowing all theme modes to update through tokens.
- **Alternatives considered**: Recreating the arcs with CSS gradients was rejected by the constitution. Inline SVG duplication was rejected because it creates alternate pattern implementations and increases maintenance risk.

## Decision: Validate with source-level and browser checks

- **Decision**: Add focused unit assertions for token definitions and allowed asset references, plus Playwright checks for footer pairing, pattern rendering, theme/contrast parity, and responsive overflow.
- **Rationale**: Existing lint and type checks do not enforce SVG or token policy, and current browser coverage does not exercise these visual contracts. Source-level checks catch prohibited alternatives; browser checks verify the user-visible result.
- **Alternatives considered**: Pixel-diff testing alone was rejected because it is brittle for semantic color-token requirements and does not explain invalid source references. Manual review alone was rejected because it cannot reliably prevent future regressions.

## Resolved Unknowns

- The project is a single React/Vite web application, not a backend/API feature.
- No data model or persistence changes are required.
- No external API contract is required; the relevant interface is a UI visual contract documented separately.
- Supported validation modes are light, dark, medium contrast, and high contrast, matching the constitution and existing selectors.
