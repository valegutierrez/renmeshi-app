# Feature Specification: Material Theme Color Audit

**Feature Branch**: `004-material-theme-color-audit`

**Created**: 2026-09-02

**Status**: Draft

**Input**: User description: "Analyze the principles in the constitution for the colors and create a feature that follows them."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent Material Theme Palette (Priority: P1)

As a visitor, I want every visible color in the Renmeshi experience to come from the approved Material Theme palette so that the site feels intentional and visually consistent across screens.

**Why this priority**: Palette consistency is the core constitution requirement and affects every visible screen and interaction.

**Independent Test**: Review every public and admin screen in each supported theme mode and verify that all visible surfaces, text, borders, controls, illustrations, and states use only approved Material Theme roles or tones.

**Acceptance Scenarios**:

1. **Given** a visitor opens any public screen, **When** the screen finishes loading, **Then** every visible color resolves to a role or tone present in the approved Material Theme export.
2. **Given** a visitor navigates between public screens, **When** surfaces and controls change, **Then** no custom accent color appears and the visual hierarchy remains coherent.

---

### User Story 2 - Readable Theme Variants (Priority: P1)

As a visitor, I want text, controls, and decorative assets to remain legible when I use light, dark, medium-contrast, or high-contrast presentation so that the palette rules do not reduce usability.

**Why this priority**: Enforcing a palette is only successful if all approved modes remain accessible and usable.

**Independent Test**: Exercise the same primary journeys in all four supported modes and verify readable text, visible focus states, distinguishable controls, and legible canonical assets.

**Acceptance Scenarios**:

1. **Given** a visitor selects any supported theme or contrast mode, **When** the page updates, **Then** text and controls maintain at least WCAG AA contrast for their intended use.
2. **Given** a visitor switches modes and reloads the site, **When** the site is displayed again, **Then** the selected mode remains applied without a flash of an unthemed palette.

---

### User Story 3 - Reviewable Color Exceptions (Priority: P2)

As a maintainer, I want palette violations and approved exceptions to be easy to identify so that future visual changes cannot quietly introduce coral, violet, gold, lime, or other ad hoc colors.

**Why this priority**: Clear review rules protect the palette after the initial cleanup and reduce regression risk.

**Independent Test**: Inspect the feature's documented rules and automated checks, then introduce a prohibited custom color in a controlled change and verify that validation identifies it.

**Acceptance Scenarios**:

1. **Given** a proposed visual change contains a hard-coded or derived color outside the Material Theme export, **When** the change is reviewed or validated, **Then** it is rejected with the affected surface and the applicable palette rule identified.
2. **Given** a visual exception is genuinely required, **When** it is proposed, **Then** the exception includes its affected surface, reason, contrast evidence, and explicit approval before it can be accepted.

### Edge Cases

- A color that visually resembles an approved tone but is not present in the Material Theme export is treated as prohibited.
- Semi-transparent overlays, shadows, gradients, filters, and blend effects must not create an unapproved effective color for a visible UI surface.
- Disabled, loading, empty, error, focus, hover, and selected states must use approved roles or tones and remain distinguishable.
- Asset artwork with intrinsic colors is not recolored unless the constitution or asset contract explicitly requires a semantic token mapping; canonical seigaiha and logo assets retain their existing rules.
- A mode-specific token missing from the export or from one of the four supported modes blocks completion until an approved equivalent is defined.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The product MUST use only roles and tones present in the approved Material Theme export for visible application UI colors.
- **FR-002**: The product MUST reject hard-coded hex, RGB, HSL, named CSS colors, opacity-derived colors, and custom palette variants for visible UI surfaces unless an explicit constitution-compliant exception exists.
- **FR-003**: The product MUST remove or replace ad hoc color variants, including coral, violet, gold, lime, and equivalent custom accent names, from application styling.
- **FR-004**: The product MUST provide equivalent approved palette coverage for light, dark, medium-contrast, and high-contrast modes.
- **FR-005**: The product MUST preserve WCAG AA contrast for text and interactive controls in every supported mode.
- **FR-006**: The product MUST keep focus, hover, selected, disabled, loading, empty, and error states distinguishable using approved palette values.
- **FR-007**: The product MUST preserve the canonical seigaiha pattern and logo asset rules while mapping their required current-color treatments only to the constitution-approved semantic roles.
- **FR-008**: The product MUST provide a repeatable review or validation method that identifies prohibited color values, derived colors, and undocumented exceptions.
- **FR-009**: Any approved exception MUST document the affected surface, justification, contrast evidence, scope, and approval before release.
- **FR-010**: The product MUST leave layout, typography, asset identity, and interaction behavior unchanged unless a change is required to remove a prohibited color or restore contrast.

### Key Entities *(include if feature involves data)*

- **Material Theme Export**: The authoritative collection of approved color roles and tones used across supported presentation modes.
- **Semantic Color Role**: A named purpose such as surface, primary, on-primary, outline variant, focus, or state color that resolves to an approved export value.
- **Color Exception Record**: A reviewable record containing the surface, reason, contrast evidence, scope, and approval for a permitted deviation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of visible application color declarations and rendered theme tokens are traceable to a role or tone in the approved Material Theme export before release.
- **SC-002**: All public and admin primary journeys pass review in 4 of 4 supported modes: light, dark, medium contrast, and high contrast.
- **SC-003**: 100% of tested normal text and interactive controls meet WCAG AA contrast in every supported mode.
- **SC-004**: A controlled introduction of a prohibited custom color is detected by the validation process before it can be approved for release.
- **SC-005**: Existing user journeys retain their current task completion behavior, with no new palette-related regression in navigation, discovery, recipe interaction, or authenticated administration.

## Assumptions

- The current Material Theme Builder export and its four supported mode mappings remain the source of truth for approved colors.
- The feature covers visible public and admin UI styling, including interaction states and decorative surfaces; it does not redesign layout or replace approved artwork.
- Existing accessibility expectations remain in force, including WCAG AA contrast and persisted theme selection.
- A color that cannot be traced to the approved export is considered prohibited unless a documented, constitution-compliant exception is approved.
- Validation is performed before release and whenever a visual surface or theme token changes.
