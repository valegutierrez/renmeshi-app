# UI Visual Contract: Canonical Assets and Theme Variants

## Scope

This contract governs the shared shell and any existing decorative surface that uses the canonical assets. It applies in light, dark, medium-contrast, and high-contrast modes.

## Seigaiha Surface

- Asset: `src/assets/seigaiha-pattern.svg`
- Rendering: the supplied SVG artwork is used without duplicated or generated geometry.
- Color: `currentColor` resolves only to the active Material Theme `Outline Variant` token.
- Prohibited: CSS arc/radial-gradient replacements, inline copies, alternate SVG files, or a second pattern color.

## Square Logo Surface

- Asset: `src/assets/renmeshi.svg`
- Rendering: supplied artwork and aspect ratio are preserved.
- Allowed colors: Material Theme `Primary` or `On Primary` only.
- Selection: choose the allowed variant that provides sufficient contrast on the surface.
- Footer invariant: `background = Primary` and `logo color = On Primary`.

## Header Wordmark

- Asset: `src/assets/renmeshi letters.svg`
- Role: header wordmark remains separate from the square-logo contract.
- Regression rule: adding the square logo must not replace or duplicate the header wordmark.

## Responsive and Accessibility Contract

- The assets remain visible and undistorted at supported desktop and mobile widths.
- No asset treatment introduces horizontal overflow or obscures adjacent content.
- All tested asset/surface pairs meet WCAG AA contrast requirements.
- Theme changes update the semantic bindings without a visible flash or layout shift.
