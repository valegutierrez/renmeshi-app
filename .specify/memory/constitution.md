<!--
Sync Impact Report
Version change: TEMPLATE → 1.0.0 (initial ratification)
Modified principles: n/a (initial adoption)
Added sections:
  - Core Principles I–VII (Retro-Pixel Identity, Material Theme as Single Source of Truth,
    Accessibility & Theming Are Non-Negotiable, Fast Client-Side First Recipe Discovery,
    Simplicity & Practicality Over Cleverness, Secure Auditable Admin Dashboard,
    Test What Breaks Dinner Plans)
  - Technology Stack & Design System (incl. mandatory TypeScript)
  - Development Workflow (incl. tests only after user-approved code)
  - Governance
Removed sections: none (template placeholders replaced)
Project owners: Daniel (senior SWE), Valentina (front-end/UX/pixel artist)
Follow-up TODOs: none
-->

# Renmeshi (錬メシ) Constitution

## Core Principles

### I. Retro-Pixel Identity, Never Generic
Every UI surface MUST honor the 16-bit/pixel-art aesthetic (SNES, Kirby, FFXIV, and
Ragnarok Online influences). Headings MUST use Raleway, body text MUST use Poppins,
and tags/subheadings MUST use the custom "Pixelpori" pixel font — no font substitutions
without an explicit, documented design exception. Decorative seigaiha wave patterns
MUST be used as section backgrounds wherever called for in designs. Any component that
reproduces generic corporate/SaaS visual patterns instead of the game-cozy identity
MUST be rejected in review.

### II. Material Theme as Single Source of Truth
All colors MUST come from the provided Material Theme Builder export (seed #00736B,
primary/secondary/tertiary + Accent #850097, full tonal palettes). Light and dark
schemes — including medium- and high-contrast variants — MUST both be implemented and
kept in sync; no scheme may lag behind another in coverage. Hard-coded hex values in
components are forbidden. Theme tokens MUST be consumed through a single design-tokens/
theme layer (e.g., CSS variables or a theme provider) that every mode (light, dark,
contrast variants) reads from — no component may bypass this layer.

### III. Accessibility & Theming Are Non-Negotiable
Every screen MUST be fully usable in both light and dark themes with no missed tokens.
All UI MUST meet WCAG AA contrast at minimum; where the base scheme cannot satisfy AA
contrast for a given surface, the medium/high-contrast theme variants MUST be used as
the fallback path rather than one-off color overrides. Theme switching MUST be instant
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

## Technology Stack & Design System

- **Framework**: React, developed using the Copilot spec-driven development workflow
  (spec → plan → tasks → implement).
- **Language**: TypeScript is mandatory (non-negotiable) for all code — components, hooks,
  utilities, and tests. Plain JavaScript files are not permitted without an explicit,
  documented design exception.
- **Theme tokens**: Sourced from the attached Material Theme Builder JSON export,
  covering light, dark, and their medium/high-contrast variants. Tokens are the only
  permitted source of color values in application code.
- **Typography**: Raleway (headings), Poppins (body text), Pixelpori (tags/subheadings) —
  see Principle I for enforcement.
- Any deviation from this stack (e.g., a new font, a hard-coded color, a non-client-side
  search path) MUST be called out explicitly in the relevant spec or plan with a stated
  reason before implementation proceeds.

## Development Workflow

- Specs and plans MUST reference the relevant Core Principle(s) when introducing new UI
  surfaces, theming behavior, search/filter behavior, or admin functionality.
- Code review MUST verify: correct font usage, theme-token-only styling, light/dark/
  contrast parity, client-side search behavior where applicable, and presence of tests
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

**Version**: 1.0.0 | **Ratified**: 2026-08-27 | **Last Amended**: 2026-08-27
