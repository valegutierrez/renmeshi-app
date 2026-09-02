# Data Model: Material Theme Color Audit

This feature introduces no persisted business data. Its design model describes the approved
palette, semantic bindings, rendered surfaces, and reviewable exceptions.

## Material Theme Export

- **Role**: Authoritative set of approved color roles and tones.
- **Attributes**: role name, tone value, presentation mode, source export reference.
- **Modes**: light, dark, medium contrast, and high contrast.
- **Validation**: every semantic token resolves to a value in this set.

## Semantic Color Role

- **Role**: Named purpose for a visible color, such as surface, primary, on-primary,
  outline-variant, focus, or an interaction state.
- **Attributes**: role name, consuming surface, mode values, contrast evidence.
- **Validation**: values come only from the Material Theme Export; local component values are
  not valid substitutes.

## Audited Visual Surface

- **Role**: A visible application surface or state that consumes one or more semantic roles.
- **Attributes**: surface identifier, route or shared-shell location, background role,
  foreground role, state, asset treatment, supported modes.
- **Validation**: all visible colors and effective effects are traceable to approved roles or
  tones, and required foreground/background pairs meet WCAG AA contrast.

## Color Exception Record

- **Role**: Explicit approval for a narrowly scoped deviation from the default palette rule.
- **Attributes**: affected surface, proposed value or treatment, justification, scope,
  contrast evidence, approver, approval date, expiration or review condition.
- **Validation**: incomplete or unapproved records do not permit release.
