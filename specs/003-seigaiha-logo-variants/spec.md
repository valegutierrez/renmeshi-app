# Feature Specification: Canonical Seigaiha and Logo Color Variants

**Feature Branch**: `003-seigaiha-logo-variants`

**Created**: 2026-09-02

**Status**: Draft

**Input**: User description: "Analyze the constitution changes to apply the seigaiha pattern and the logo color variants of renmeshi.svg as a new feature"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent Seigaiha Decoration (Priority: P1)

As a visitor, I want every seigaiha decoration to use the same approved Renmeshi pattern so the site feels cohesive and intentional.

**Why this priority**: The pattern is a shared visual identity element and inconsistent treatments would undermine the updated constitution.

**Independent Test**: Review every screen and section that calls for a seigaiha background and confirm the same canonical pattern appears with the approved outline color in each supported theme mode.

**Acceptance Scenarios**:

1. **Given** a page or section requires a seigaiha background, **When** the page is displayed, **Then** it uses `src/assets/seigaiha-pattern.svg` and no alternate or generated seigaiha treatment is visible.
2. **Given** the visitor changes between light, dark, medium-contrast, and high-contrast modes, **When** a seigaiha background remains visible, **Then** its only applied color is the active Material Theme `Outline Variant` token.

### User Story 2 - Surface-Appropriate Renmeshi Logo (Priority: P1)

As a visitor, I want the Renmeshi logo to remain legible on each surface while retaining its original shape and identity.

**Why this priority**: The logo is a primary brand signal, and incorrect color selection can make it unreadable or violate the constitution’s Material Theme requirements.

**Independent Test**: Inspect the header and footer in every supported theme mode and verify that the attached logo is used with only the permitted theme variants.

**Acceptance Scenarios**:

1. **Given** the footer has a `Primary` background, **When** the footer is displayed, **Then** `src/assets/renmeshi.svg` uses the Material Theme `On Primary` variant and remains readable.
2. **Given** the logo appears on a surface where the `Primary` variant provides the required contrast, **When** the logo is displayed, **Then** its `currentColor` uses the Material Theme `Primary` token.
3. **Given** the visitor changes theme or contrast mode, **When** the logo is displayed, **Then** it remains legible and uses only `Primary` or `On Primary`, with no hard-coded substitute color.

### User Story 3 - Maintainable Asset Rules (Priority: P2)

As a maintainer, I want the pattern and logo color rules to be easy to verify so future visual changes do not silently introduce competing assets or colors.

**Why this priority**: Explicit, verifiable rules reduce regressions as new pages and themed surfaces are added.

**Independent Test**: Run the project’s visual and source-level checks against the asset references and theme bindings, then review the resulting changed surfaces against the constitution.

**Acceptance Scenarios**:

1. **Given** the feature implementation is reviewed, **When** asset references and color bindings are inspected, **Then** the canonical pattern and logo asset are identifiable and the allowed token mappings are explicit.
2. **Given** a new seigaiha or logo surface is added later, **When** it is reviewed, **Then** it can be checked against the same asset and token restrictions without introducing a new exception.

### Edge Cases

- A seigaiha background must remain visible and correctly colored when switching among all four supported theme and contrast modes.
- A logo placed on a non-primary surface must not use a color that fails contrast; it must select only the permitted `Primary` or `On Primary` token that is appropriate for that surface.
- Responsive layouts must not crop, distort, or hide the pattern or logo at narrow viewport widths.
- Missing or invalid asset references must fail the relevant validation rather than silently falling back to a generated pattern or arbitrary color.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST use `src/assets/seigaiha-pattern.svg` as the only seigaiha pattern wherever a seigaiha decoration is required.
- **FR-002**: The application MUST NOT create seigaiha patterns through CSS, inline markup, duplicated asset variants, or alternative files.
- **FR-003**: The seigaiha asset MUST apply only the active Material Theme `Outline Variant` token as its color in light, dark, medium-contrast, and high-contrast modes.
- **FR-004**: The application MUST use `src/assets/renmeshi.svg` for the Renmeshi square logo surfaces covered by the existing design.
- **FR-005**: The logo MUST map its `currentColor` only to Material Theme `Primary` or `On Primary`, selected according to the surface and required contrast.
- **FR-006**: A footer with a `Primary` background MUST render the logo with the Material Theme `On Primary` variant.
- **FR-007**: The header wordmark MUST continue to use the approved `renmeshi letters.svg` asset and MUST remain visually distinct from the square logo rule.
- **FR-008**: The pattern and logo color bindings MUST remain synchronized across light, dark, medium-contrast, and high-contrast modes without one-off hard-coded color overrides.
- **FR-009**: The implementation MUST preserve the supplied SVG artwork, aspect ratio, and responsive usability across supported viewport sizes.
- **FR-010**: Automated checks MUST cover canonical asset usage, permitted color-token mappings, footer `Primary`/`On Primary` behavior, and theme-mode parity.

## Key Entities *(include if feature involves data)*

- **Canonical Seigaiha Asset**: The single approved decorative pattern at `src/assets/seigaiha-pattern.svg`, colored only by `Outline Variant`.
- **Renmeshi Logo Asset**: The supplied square logo at `src/assets/renmeshi.svg`, colored only by `Primary` or `On Primary` according to its surface.
- **Theme Surface Variant**: The active Material Theme semantic token and mode that determine the permitted color for a pattern or logo surface.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of seigaiha surfaces identified in the application use the canonical `src/assets/seigaiha-pattern.svg` asset, with zero alternate or generated seigaiha implementations.
- **SC-002**: 100% of tested light, dark, medium-contrast, and high-contrast modes show the seigaiha using only `Outline Variant` and the logo using only `Primary` or `On Primary`.
- **SC-003**: 100% of footer checks confirm that a `Primary` footer background is paired with the `On Primary` logo variant.
- **SC-004**: All supported desktop and mobile viewport checks show the pattern and logo without clipping, distortion, or horizontal overflow.
- **SC-005**: Reviewers can identify the canonical asset and its permitted theme-token mapping from the implementation and automated checks without requiring an undocumented exception.

## Assumptions

- The existing Material Theme provider already exposes semantic `Outline Variant`, `Primary`, and `On Primary` tokens for all supported modes.
- Existing public pages and the Backstage area remain in scope wherever they already display a seigaiha pattern or the square Renmeshi logo; no new branded surfaces are added by this feature.
- The existing header wordmark continues using `src/assets/renmeshi letters.svg` and is not recolored under the square-logo rule unless its current surface requires a separately documented design decision.
- The attached SVG files are available in the repository at the constitution-approved paths.
- Existing accessibility and responsive behavior remains a release requirement; this feature does not lower those requirements.
