# Implementation Plan: Material UI Theme and Recipe Card Refresh

**Branch**: `005-material-ui-recipe-card-refresh` | **Date**: 2026-09-02 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/005-material-ui-recipe-card-refresh/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Refresh the application around the constitution-approved Material Theme and Material UI
component system, then replace category pixel art in homepage recipe cards with required
administrator-uploaded food imagery. Preserve category art in its approved category contexts,
add Pixelpori `On Surface` labels with a theme-derived white stroke, and maintain existing
discovery, theme, and administration behavior.

The implementation will extend the recipe model with a stable image reference, add validated
multipart upload and narrowly scoped image serving, migrate affected controls and cards to
Material UI, and keep the existing semantic CSS token layer as the single color authority.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 6.0.2, React 19.2.8

**Primary Dependencies**: Vite 8.2.2, Material UI 9.4.0, Emotion, Node.js HTTP server,
Vitest, Playwright, Oxlint

**Storage**: Existing JSON recipe store plus generated image files in a configured upload
directory; no database migration

**Testing**: Vitest unit/integration tests, Playwright browser tests, Oxlint, TypeScript build

**Target Platform**: Responsive browser client with the existing local Node.js development API

**Project Type**: Full-stack TypeScript web application

**Performance Goals**: Recipe discovery remains immediate for the seeded collection; image
serving streams files without loading full binaries into memory; normal card media loads without
blocking text or navigation.

**Constraints**: Only Material Theme export colors; Material UI for refreshed controls; no
Bootstrap; image uploads limited to validated JPEG, PNG, or WebP files under the configured
request/file limits; failed edits preserve the previous image and recipe.

**Scale/Scope**: Existing public discovery/detail/About routes and authenticated Backstage
recipe create/edit flow; seeded collection and small local file-backed dataset; light and dark
theme schemes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I**: PASS. Category pixel art remains limited to homepage categories and the
  header Recipes dropdown; recipe cards use food imagery; Pixelpori treatment and approved
  brand assets remain governed by the constitution.
- **Principle II**: PASS. Material UI is the sole component library for refreshed surfaces;
  Material Theme tokens remain the sole color authority; Bootstrap and custom colors are
  excluded.
- **Principle III**: PASS. The design includes light/dark parity, WCAG contrast checks,
  focus-state checks, responsive overflow checks, and persisted theme behavior.
- **Principle IV**: PASS. Existing client-side recipe discovery and filtering remain intact.
- **Principle VI**: PASS. Image upload and recipe mutation remain behind existing server-side
  admin authorization and audit logging.
- **Principle VII**: PASS. Unit, integration, browser, lint, build, and controlled regression
  checks are planned before completion.
- **Complexity gate**: PASS. Multipart parsing and generated-file storage are required by the
  clarified administrator-upload requirement; the existing JSON store remains the metadata
  authority and no new database abstraction is introduced.

## Project Structure

### Documentation (this feature)

```text
specs/005-material-ui-recipe-card-refresh/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── app/theme/
├── components/shared/
├── features/discovery/
├── features/backstage/
├── models/
├── services/
└── lib/

server/
├── auth/
├── http/
├── recipes/
├── storage/
└── uploads/

tests/
├── browser/
├── integration/
└── unit/
```

**Structure Decision**: Retain the existing single repository full-stack layout. Extend the
existing `src/`, `server/`, and `tests/` boundaries with focused upload, theme, Material UI,
recipe-card, and validation surfaces. Do not introduce a second frontend/backend project.

## Post-Design Constitution Check

- **Principles I–III**: PASS. The design keeps category pixel art in its restricted contexts,
  uses mockup-aligned food imagery for cards, routes Pixelpori strokes through theme values, and
  validates both light and dark schemes for contrast and responsive behavior.
- **Principles IV and VI**: PASS. Existing client-side discovery remains unchanged, while image
  mutations use the authenticated recipe-management boundary and preserve audit semantics.
- **Principle VII**: PASS. The validation guide covers unit, integration, browser, lint, build,
  upload rollback, image serving, card hierarchy, and theme parity checks.
- **Technology Stack**: PASS. Material UI is the only refreshed component library, Bootstrap is
  excluded, and the attached Material Theme export remains the only color authority.
- **Unresolved design gates**: None. File-size/dimension limits are implementation parameters
  to be finalized as bounded defaults in the task breakdown, not open product decisions.

## Complexity Tracking

No constitution violations require tracking. The upload service is a direct consequence of the
clarified requirement that every recipe own an administrator-uploaded image.

| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
