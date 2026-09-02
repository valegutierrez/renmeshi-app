# Research: Material Theme Color Audit

## Decision: Treat the Material Theme export as the sole color authority

- **Decision**: Every visible application color must resolve to a role or tone present in
  the approved Material Theme Builder export, including light, dark, medium-contrast, and
  high-contrast values.
- **Rationale**: Principle II and the design-system rules explicitly prohibit custom colors,
  derived colors, and ad hoc variants. A single authority makes palette review deterministic.
- **Alternatives considered**: Keeping mockup colors as a parallel palette was rejected because
  it permits unapproved values and creates mode-parity gaps. Allowing visually similar colors
  was rejected because resemblance cannot prove membership in the export.

## Decision: Use semantic roles for application surfaces and states

- **Decision**: Visible surfaces, text, borders, focus indicators, controls, and states use
  semantic roles whose values are supplied by the Material Theme export.
- **Rationale**: Semantic roles preserve intent across modes and prevent components from
  bypassing the shared theme layer with local values.
- **Alternatives considered**: Assigning colors directly per component was rejected because
  it duplicates palette logic and makes contrast and mode parity difficult to audit.

## Decision: Treat derived visual effects as palette policy violations

- **Decision**: Gradients, opacity overlays, filters, blend modes, shadows, and similar effects
  are in scope for audit when they create visible colors outside the approved export.
- **Rationale**: The constitution prohibits opacity-derived colors and the feature edge cases
  require effective rendered colors, not only literal declarations, to remain compliant.
- **Alternatives considered**: Auditing only hex declarations was rejected because derived
  effects could still reintroduce unapproved colors while passing a literal-value scan.

## Decision: Require documented exceptions rather than informal judgment

- **Decision**: Any exception records the affected surface, reason, contrast evidence, scope,
  and explicit approval before release.
- **Rationale**: This preserves the constitution's silent-deviation prohibition and gives code
  review a repeatable decision trail.
- **Alternatives considered**: Allowing reviewer discretion without a record was rejected because
  it cannot protect the palette from future regressions.

## Resolved Unknowns

- The feature targets the existing single React/Vite web application.
- No persisted business data or API changes are required.
- The relevant external interface is the user-visible UI visual contract, documented separately.
- Existing four-mode theme selectors, semantic token layer, and automated test tooling are reused.
