<!--
Sync Impact Report
Version change: 1.4.0 → 1.4.0 (version retained per project-owner direction)
Modified principles:
  - II. Material Theme and Material UI Design System: permit the selected exported Accent role
  - III. Accessibility & Theming Are Non-Negotiable: align contrast guidance with light/dark themes
  - Technology Stack & Design System: align theme-token and pattern guidance with the amendment
Added sections:
  - None
Removed sections: none
Project owners: Daniel (senior SWE), Valentina (front-end/UX/pixel artist)
Follow-up TODOs:
  - None
-->

# Renmeshi (錬メシ) Constitution

## Core Principles

### I. Retro-Pixel Identity and Reference Assets
Every UI surface MUST honor the 16-bit/pixel-art aesthetic (SNES, Kirby, FFXIV, and
Ragnarok Online influences). Headings MUST use Raleway, body text MUST use Poppins,
and tags/subheadings MUST use the supplied `pixelpori.ttf` font — no font substitutions
without an explicit, documented design exception. Decorative seigaiha wave patterns MUST
use only `src/assets/seigaiha-pattern.svg`; CSS-generated, inline, duplicated, or alternative
seigaiha patterns are forbidden. The SVG's `currentColor` MUST be supplied by the Material
Theme `Outline Variant` semantic token in every theme and contrast mode.
The supplied `appetizer.png`, `main-dish.png`, `side-dish.png`, and `dessert.png` assets
MUST be used only for the corresponding category illustrations in the homepage category
section and as the category icon in the header Recipes dropdown, following the category
label. These pixel-art assets MUST NOT be used as recipe-card imagery. Recipe cards MUST
use a food or recipe image with the photographic/editorial composition shown in the
approved design mockup, with the image occupying the card's prominent visual area. The
supplied `renmeshi.svg` MUST be used for the square
footer logo and `renmeshi letters.svg` MUST be used for the header wordmark. The `currentColor`
of `src/assets/renmeshi.svg` MUST use only the Material Theme `On Primary` or `Primary`
semantic token, selected according to the surface where the logo appears. In particular,
when the footer background is `Primary`, the footer logo MUST use the `On Primary` variant.
Any component
that reproduces generic corporate/SaaS visual patterns instead of the game-cozy identity
MUST be rejected in review.

Pixelpori subheadings, tags, and other pixel-art display labels MUST use the supplied
`pixelpori.ttf` font, MUST use the Material Theme `On Surface` token for their text fill,
and MUST have the white outline/stroke shown in the approved design. The stroke MUST use
the Material Theme export's approved white tone (for example, the `On Primary` or neutral
100 value) through the theme layer; a literal hard-coded white value is forbidden.

### II. Material Theme and Material UI Design System
Every application color MUST be a role or tone present in the attached Material Theme
Builder export (`material-theme.json`, seed `#00736B`), including its primary, secondary,
tertiary, neutral, neutral-variant, error, surface, outline, fixed, contrast scheme, and
extended `Accent` roles. The light and dark schemes MUST be implemented from that export and
kept in sync; no
scheme may lag behind another in coverage. Hard-coded hex, RGB, HSL, named CSS colors,
opacity-derived colors, and custom color variants are forbidden in application UI. The
unharmonized extended Accent #850097 is explicitly approved for use through the
shared theme-token layer; this approval does not extend to any color absent from the export.

Names such as `coral`, `violet`, `gold`, and `lime`, along with any other ad hoc accent or
palette variant not present in the export, MUST NOT be introduced as colors. Theme tokens MUST
be consumed through a
single design-token/theme layer that every supported mode reads from; no component may
bypass this layer. Semantic tokens MUST resolve only to values defined by the attached
Material Theme export. Visual resemblance to a mockup MUST NOT justify a new color.

All UI components, controls, feedback surfaces, overlays, and layout primitives MUST come
from Material UI (`@mui/material`) or approved project-local wrappers around Material UI.
Bootstrap components, Bootstrap themes, Bootstrap color utilities, and Bootstrap theming
overrides MUST NOT be introduced or used. Material UI theme configuration MUST consume the
approved Material Theme semantic roles rather than inventing a parallel palette. The
attached design mockups remain visual inspiration for layout, hierarchy, spacing, asset
placement, responsive behavior, and overall tone; they MUST NOT override Material Theme
tokens, WCAG requirements, Material UI usage, or approved asset rules.

Implementations MUST preserve the mockups' intentional cozy editorial character while
adapting details where necessary for accessibility, responsive usability, or theme parity.
The canonical seigaiha asset MUST be rendered without introducing a second pattern color;
its only applied color is the active `Outline Variant` token.

### III. Accessibility & Theming Are Non-Negotiable
Every screen MUST be fully usable in both light and dark themes with no missed tokens.
All UI MUST meet WCAG AA contrast at minimum; surfaces that need stronger contrast MUST use
another approved role or tone from the active Material Theme scheme rather than one-off color
overrides. Theme switching MUST be instant
(no visible flash or layout shift) and the user's chosen theme MUST persist across
sessions.

### IV. Fast, Client-Side First Recipe Discovery
Search and filtering (category: Appetizers/Mains/Sides/Desserts, cooking time) MUST be
instant and client-side wherever the recipe dataset size allows — no unnecessary network
round-trips for filtering/search interactions. Recipe detail views MUST support
interactive ingredient checklists and serving-size scalers as first-class, reusable
components; these MUST NOT be implemented as one-off logic embedded in a single page.

### V. Simplicity & Practicality Over Cleverness
Tone in copy, UX flows, and code comments MUST be friendly, no-fuss, and "gamer-cozy" —
matching creators Daniel (senior SWE) and Valentina (front-end/UX/pixel artist). Favor
straightforward React patterns (hooks, composition) over premature abstraction. Every
feature MUST justify its complexity against the core purpose of the app: answering
"what should we cook tonight?" quickly. Complexity that does not serve this purpose
MUST be simplified or removed.

### VI. Secure, Auditable Admin Dashboard
The Backstage admin area (sign-in/out, recipe log review, create/edit recipes) MUST
enforce authenticated access to all mutating routes/actions. Client-side-only auth
checks MUST NEVER be trusted as the sole gate — server-side/API-level authorization is
required. Recipe create/edit actions MUST be logged for audit purposes. The admin UI
MUST follow the same pixel-art/theme rules (Principles I–III) as the public site; it is
not exempt as a "plain" internal tool.

### VII. Test What Breaks Dinner Plans
Recipe search/filter logic, ingredient-scaling math, and auth-gated admin actions
require automated tests before being considered done. Visual/pixel-art styling does
NOT require pixel-diff tests unless explicitly requested for a specific feature.

### VIII. About Us and Product Story
The public site MUST include an About Us page that explains the Renmeshi story, its creators'
shared interest in cooking and coding, and the purpose of the recipe experience. The page
MUST be reachable through the public site navigation, use the shared theme and typography
system, and remain fully usable on mobile and desktop. Its content MUST support the product's
human, personal, and gamer-cozy character without displacing the primary recipe-discovery
workflow or introducing user accounts, social features, or unrelated marketing flows.

## Technology Stack & Design System

- **Framework**: React, developed using the Copilot spec-driven development workflow
  (spec → plan → tasks → implement).
- **Language**: TypeScript is mandatory (non-negotiable) for all code — components, hooks,
  utilities, and tests. Plain JavaScript files are not permitted without an explicit,
  documented design exception.
- **Theme tokens**: Sourced from the attached Material Theme Builder JSON export,
  covering light and dark variants and the explicitly approved unharmonized `Accent` role.
  Tokens are the only permitted source of color values in application code. No custom color
  names, hard-coded values, opacity-derived colors, or variants such as coral, violet, gold,
  or lime are permitted unless they are present in the export.
- **Component library**: Material UI (`@mui/material`) is the only approved component
  library. New UI components MUST use Material UI or a project-local wrapper around it.
  Bootstrap and other component-library theming MUST NOT be added.
- **Typography**: Raleway (headings), Poppins (body text), and the supplied Pixelpori font
  at `src/assets/fonts/pixelpori.ttf` for tags/subheadings — see Principle I for enforcement.
- **Approved category visual assets**: `src/assets/pixelart/appetizer.png`,
  `src/assets/pixelart/main-dish.png`, `src/assets/pixelart/side-dish.png`,
  `src/assets/pixelart/dessert.png`. These assets are restricted to the homepage category
  section and the category icons in the header Recipes dropdown; they MUST NOT be used in
  recipe cards.
- **Recipe-card imagery**: Recipe cards MUST use food or recipe imagery that follows the
  approved mockup's prominent editorial image treatment. Card imagery MUST be distinct
  from the restricted category pixel-art assets and MUST preserve the card hierarchy,
  cropping, and responsive behavior shown by the mockup.
- **Brand assets**: `src/assets/renmeshi.svg` and `src/assets/renmeshi letters.svg` are
  governed by Principle I for footer logo and header wordmark usage.
- **Pixel-art subheadings**: Pixelpori labels MUST use the `On Surface` text token and an
  approved white Material Theme tone for the visible stroke, implemented through the theme
  layer rather than hard-coded color values.
- **Canonical Seigaiha Pattern**: `src/assets/seigaiha-pattern.svg` is the only permitted
  seigaiha pattern in the application. It MUST be used wherever a seigaiha background is
  required, with `currentColor` mapped exclusively to the Material Theme `Outline Variant`
  token across light and dark modes.
- **Logo color variants**: `src/assets/renmeshi.svg` MUST use `currentColor` mapped only to
  the Material Theme `On Primary` or `Primary` token, selected for sufficient contrast with
  its surface. A footer using the `Primary` background MUST render the logo with `On Primary`.
- **Design references**: `.specify/design-mockups/` contains inspiration for the public
  site's composition and visual tone. Mockups are references, not a second source of truth
  for colors or accessibility behavior.
- Any deviation from this stack (e.g., a new font, a hard-coded color, a non-client-side
  search path) MUST be called out explicitly in the relevant spec or plan with a stated
  reason before implementation proceeds.

## Development Workflow

- Specs and plans MUST reference the relevant Core Principle(s) when introducing new UI
  surfaces, theming behavior, search/filter behavior, or admin functionality.
- Code review MUST verify: correct font usage, theme-token-only styling, light/dark parity,
  client-side search behavior where applicable, and presence of tests
  for search/filter logic, scaling math, and auth-gated admin actions.
- Deviations approved via an explicit spec/plan exception remain visible in that
  document; they do not require a constitution amendment unless they represent a
  lasting change in policy.
- Automated tests (per Principle VII) MUST only be written after the user has reviewed
  and approved the generated implementation code for a feature. Tests MUST NOT be
  written against half-made or unapproved features — writing tests first for code
  the user has not yet reviewed is not permitted under this workflow.

## Governance

This constitution supersedes ad-hoc styling or technology choices across the project.
Any deviation from it (e.g., a new font, a hard-coded color, a non-client-side search
path) MUST be called out explicitly in the relevant spec/plan along with a stated
reason; silent deviations are not permitted. Amendments require updating this document,
recording the change in a Sync Impact Report, and applying a version bump (semantic
versioning: MAJOR for backward-incompatible principle removals/redefinitions, MINOR for
new principles or materially expanded guidance, PATCH for clarifications and wording
fixes) along with an updated date. All PRs and reviews MUST verify compliance with this
constitution; complexity must be justified against Principle V.

**Project Owners**: Daniel (senior SWE), Valentina (front-end/UX/pixel artist)

Version: 1.4.0 | Ratified: 2026-08-27 | Last Amended: 2026-09-02
