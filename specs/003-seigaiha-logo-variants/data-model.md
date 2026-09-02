# Data Model: Canonical Seigaiha and Logo Color Variants

This feature does not introduce persisted business data. The design model consists of visual assets and theme surface bindings.

## Canonical Seigaiha Asset

- **Path**: `src/assets/seigaiha-pattern.svg`
- **Role**: The only permitted seigaiha background pattern.
- **Color binding**: Active Material Theme `Outline Variant`.
- **Modes**: Light, dark, medium contrast, and high contrast.
- **Validation**: The asset exists, is referenced by required surfaces, and no alternate/generated pattern is present.

## Renmeshi Logo Asset

- **Path**: `src/assets/renmeshi.svg`
- **Role**: Square Renmeshi logo for footer and other approved square-logo surfaces.
- **Color bindings**: Material Theme `On Primary` or `Primary` only.
- **Footer state**: `Primary` background paired with `On Primary` logo.
- **Validation**: Logo artwork and aspect ratio remain unchanged; rendered color is sourced from an allowed semantic token.

## Theme Surface Binding

- **Fields**:
  - `mode`: light, dark, medium contrast, or high contrast.
  - `surface`: the UI surface displaying a pattern or logo.
  - `backgroundToken`: semantic token applied to the surface background.
  - `foregroundToken`: semantic token applied to the asset's `currentColor`.
- **Validation rules**:
  - Seigaiha: `foregroundToken = Outline Variant`.
  - Square logo: `foregroundToken` is `Primary` or `On Primary`.
  - Footer: `backgroundToken = Primary` implies `foregroundToken = On Primary`.
  - The selected foreground/background pair must meet WCAG AA contrast.
