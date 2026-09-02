# Feature Specification: Material UI Theme and Recipe Card Refresh

**Feature Branch**: `005-material-ui-recipe-card-refresh`

**Created**: 2026-09-02

**Status**: Draft

**Input**: User description: "Analyze the new constitution to change the theme of the app to use Material UI and material theme json, update the recipe cards of the homepage to stop using the pixel art images and to follow the recipe card design attached (Pasted image), also if the pixel font is used as a subheading, add a white stroke similar to those in the pixel art images while keep using only the colors from material theme"

## Clarifications

### Session 2026-09-02

- Q: How should recipe images be provided when an administrator creates or edits a recipe? → A: Administrators upload an image file through the editor, and the application stores and serves that image with the recipe.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Use the Approved Material UI Theme (Priority: P1)

As a visitor, I want the application interface to use one coherent Material UI theme so that
controls, surfaces, states, and typography behave consistently across the public and admin
experiences.

**Why this priority**: A single component and theme system is required by the constitution and
prevents visual and accessibility drift between screens.

**Independent Test**: Visit the public and admin route families in every supported theme mode
and verify that visible controls and surfaces use the approved Material Theme roles and the
same component language.

**Acceptance Scenarios**:

1. **Given** a visitor opens a public or admin screen, **When** the screen finishes loading,
   **Then** its interactive components use the approved Material UI component language and
   resolve colors through the attached Material Theme export.
2. **Given** the visitor changes between light and dark modes, **When** the
   interface updates, **Then** component states remain readable and no Bootstrap or other
   competing theme treatment appears.

---

### User Story 2 - Browse Editorial Recipe Cards (Priority: P1)

As a visitor, I want recipe cards to show appetizing food imagery and the information hierarchy
shown in the approved card mockup so that I can scan recipes and choose one quickly.

**Why this priority**: Recipe cards are the main discovery surface, and their imagery and hierarchy
must communicate the dish more effectively than category illustrations can.

**Independent Test**: Open the homepage at desktop and mobile widths, inspect every recipe card,
and verify that each card follows the mockup structure and uses food imagery rather than a
category pixel-art illustration.

**Acceptance Scenarios**:

1. **Given** the homepage displays a recipe card, **When** the card is visible,
   **Then** its prominent image area contains food or recipe imagery, followed by the category,
   recipe name, description or keywords, metadata, and a clear read-more action in the visual
   order represented by the mockup.
2. **Given** the homepage displays several recipe cards, **When** the visitor scans the grid,
   **Then** cards share a consistent image treatment, spacing, rounded shape, readable labels,
   and actionable interaction without using the homepage category pixel-art files.
3. **Given** the viewport changes from desktop to mobile, **When** the card layout reflows,
   **Then** imagery remains prominent, text stays within its card, and no card causes horizontal
   overflow or unreadable clipping.
4. **Given** an administrator creates or edits a recipe, **When** the form is submitted,
   **Then** an uploaded recipe image is stored with the recipe and appears on its homepage card.

---

### User Story 3 - Preserve Pixel-Art Category and Label Identity (Priority: P2)

As a visitor, I want the pixel-art category illustrations and Pixelpori labels to retain their
identity in their intended places without competing with recipe-card imagery.

**Why this priority**: The category illustrations and pixel typography are distinctive brand
assets with explicitly limited placement rules.

**Independent Test**: Inspect the homepage category section and header Recipes dropdown in every
supported mode, then inspect Pixelpori subheadings for the required fill and outline treatment.

**Acceptance Scenarios**:

1. **Given** the homepage category section or header Recipes dropdown is displayed, **When** a
   category is shown, **Then** its matching pixel-art illustration appears only in that category
   context and is not reused as a recipe-card image.
2. **Given** a Pixelpori font is used for a subheading or display label, **When** it is rendered,
   **Then** its fill uses the active Material Theme `On Surface` role and its visible outline
   uses the approved white tone from the Material Theme export, matching the attached design.
3. **Given** the visitor switches theme or contrast mode, **When** category art or pixel labels
   remain visible, **Then** the artwork stays intact and the label treatment remains legible without
   introducing a hard-coded color.

### Edge Cases

- A recipe without a dedicated food image must use an approved editorial fallback treatment and
  must not fall back to appetizer, main-dish, side-dish, or dessert pixel art.
- A recipe cannot be published without a valid uploaded image file; failed, unsupported, or
  incomplete uploads must provide actionable validation feedback and leave the prior saved image
  unchanged during edits.
- Long recipe names, descriptions, category labels, and metadata must wrap or truncate within
  stable card dimensions without overlapping the image or read-more action.
- A missing or invalid category asset must fail the relevant asset check rather than silently
  appearing in a recipe card.
- A Pixelpori label on a dark or high-contrast surface must retain sufficient separation between
  its `On Surface` fill and approved white outline.
- Theme changes must not replace Material UI component states with ad hoc color overrides or
  introduce Bootstrap styling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST use Material UI components or approved project-local wrappers
  for all new and refreshed controls, surfaces, menus, dropdowns, and feedback states in scope.
- **FR-002**: The application MUST use the attached `material-theme.json` export as the sole
  source for Material Theme color roles and tones across the light and dark schemes.
- **FR-003**: The application MUST NOT introduce or use Bootstrap components, Bootstrap themes,
  Bootstrap color utilities, or competing component-library theming.
- **FR-004**: Recipe cards MUST use prominent food or recipe imagery following the attached
  mockup's editorial card composition and MUST NOT use the approved category pixel-art images.
- **FR-004a**: Every recipe MUST have one valid stored image file, and the create/edit workflow
  MUST require administrators to upload that image before the recipe can be saved or published.
- **FR-004b**: Image upload validation MUST reject unsupported or incomplete files with actionable
  feedback and MUST preserve the existing saved image when an edit upload fails.
- **FR-005**: Recipe cards MUST preserve an identifiable category label, recipe title,
  supporting description or keywords, useful metadata, and an accessible read-more action.
- **FR-006**: Recipe-card imagery MUST remain prominent, consistently cropped, and responsive
  across desktop and mobile viewports without text overlap or horizontal overflow.
- **FR-007**: The approved appetizer, main-dish, side-dish, and dessert pixel-art images MUST be
  restricted to their matching homepage category illustrations and category icons in the header
  Recipes dropdown.
- **FR-008**: Pixelpori subheadings and display labels MUST use the supplied font, use the active
  Material Theme `On Surface` role for their fill, and use an approved white Material Theme tone
  for their visible stroke.
- **FR-009**: The stroke treatment MUST not use a hard-coded white value, opacity-derived color,
  gradient, or custom palette variant; it MUST resolve through the shared theme layer.
- **FR-010**: Existing recipe navigation, filtering, category discovery, and theme persistence
  MUST continue working after the visual refresh.
- **FR-011**: Automated checks MUST cover Material UI/theme usage, prohibited Bootstrap or custom
  palette usage, recipe-card image sources and hierarchy, Pixelpori fill/stroke rules, both
  theme schemes, and responsive overflow.

## Key Entities *(include if feature involves data)*

- **Material Theme Export**: The attached JSON collection of approved roles and tones for the
  light and dark schemes used as the color authority.
- **Recipe Card**: A homepage discovery item containing the recipe's stored food image, category,
  title, supporting content, metadata, and a read-more action.
- **Recipe Image File**: The required administrator-uploaded image associated with exactly one
  recipe and served as that recipe card's prominent visual asset.
- **Category Pixel-Art Asset**: One of the four supplied illustrations restricted to homepage
  categories and header Recipes dropdown icons.
- **Pixelpori Display Label**: A subheading or label using the supplied pixel font with `On
  Surface` fill and a theme-approved white outline.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of new or refreshed controls and surfaces in scope use Material UI or an
  approved local wrapper, with zero Bootstrap component or theme dependencies introduced.
- **SC-002**: 100% of visible application colors in the refreshed surfaces trace to the attached
  Material Theme export across the light and dark schemes.
- **SC-003**: 100% of homepage recipe cards use food or recipe imagery and zero recipe cards use
  the four restricted category pixel-art files.
- **SC-004**: All homepage recipe-card checks pass at desktop and mobile widths with no horizontal
  overflow, text overlap, or clipped primary actions.
- **SC-005**: All tested Pixelpori subheadings use `On Surface` fill and an approved white theme
  stroke while remaining legible in every supported scheme.
- **SC-006**: Existing discovery, category navigation, recipe navigation, and theme persistence
  acceptance checks continue to pass after the refresh.

## Assumptions

- The attached Material Theme Builder JSON is the authoritative export referenced by the current
  constitution and remains available to implementation and validation workflows.
- The existing four category pixel-art assets remain available at their constitution-approved
  paths and are not replaced by this feature.
- Recipe imagery is supplied by administrators as uploaded image files and is stored with the
  corresponding recipe; external image URLs and category pixel-art substitutions are out of scope.
- The attached recipe-card image is the visual reference for hierarchy, image prominence, rounded
  card silhouette, labels, metadata, and read-more treatment; it does not authorize colors outside
  the Material Theme export.
- This feature changes the visual system and homepage card presentation but does not add accounts,
  recipe-management capabilities, or new discovery filters.
