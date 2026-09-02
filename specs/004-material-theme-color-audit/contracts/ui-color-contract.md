# UI Color Contract: Material Theme Only

## Scope

This contract applies to every visible public and admin surface in light, dark,
medium-contrast, and high-contrast modes.

## Approved Color Source

- Every visible color MUST resolve to a role or tone in the approved Material Theme Builder
  export.
- Semantic tokens are the only application-level color interface.
- Hard-coded hex, RGB, HSL, named CSS colors, opacity-derived colors, gradients, filters,
  blend effects, and custom palette variants are prohibited when they create an unapproved
  visible result.
- Names and values such as coral, violet, gold, lime, or equivalent ad hoc variants are not
  approved palette entries.

## Mode Parity

- Light, dark, medium-contrast, and high-contrast modes MUST define equivalent coverage for
  every semantic role used by the application.
- Switching modes MUST update all consuming surfaces without a flash of an unrelated palette
  or a layout shift.

## Surface and State Requirements

- Text, controls, borders, focus indicators, hover, selected, disabled, loading, empty, and
  error states MUST use approved semantic roles and remain distinguishable.
- Every tested text and interactive foreground/background pair MUST meet WCAG AA contrast.
- The canonical seigaiha pattern MUST use only `Outline Variant` for `currentColor`.
- The square logo MUST use only `Primary` or `On Primary`; a `Primary` footer MUST pair with
  `On Primary` for the logo.

## Exceptions

A deviation is valid only when its record identifies the affected surface, justification,
contrast evidence, scope, explicit approval, and review condition. Undocumented or expired
exceptions fail review.
