# Implementation Plan: Core Renmeshi Recipe Experience

**Branch**: `001-recipe-experience` | **Date**: 2026-09-01 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-recipe-experience/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Build the primary Renmeshi cooking workflow: a public recipe catalog with instant combined
search and filters, a practical recipe detail view, persistent light/dark theming, and a
separate authenticated Backstage area for recipe management and audit history. The current
repository is a frontend-only Vite app, so the plan adds a server-backed persistence and
authorization boundary for admin operations while keeping the typical public discovery
interaction client-side-first.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 6.x with React 19; server-side TypeScript for the protected recipe-management boundary

**Primary Dependencies**: Existing Vite, React, React DOM, Material UI, Emotion, and Node-compatible server runtime; add only dependencies required for session authentication, persistence, routing, validation, and automated testing after implementation approval

**Storage**: Durable server-side recipe and audit storage; browser storage for anonymous theme preference and per-recipe checklist state while viewing

**Testing**: Add a TypeScript-compatible unit/integration test runner and browser-level accessibility/workflow checks during implementation; required coverage includes filtering, scaling, and server authorization

**Target Platform**: Responsive modern browsers plus a Node-compatible server environment

**Project Type**: Full-stack responsive web application with public frontend and protected admin area

**Performance Goals**: 95% of typical collection searches and filter changes update visible results within 100 ms; theme application and ordinary navigation must not show a wrong-theme flash

**Constraints**: WCAG AA contrast in both themes; Material Theme Builder tokens are the only component color source; Raleway, Poppins, and Pixelpori typography rules apply; server/API authorization is mandatory for Backstage mutations; no regular visitor accounts, ratings, comments, meal planning, or imports

**Scale/Scope**: One public recipe collection, recipe detail workflow, theme control available on all screens, one authenticated admin role, Backstage history, and create/edit flows; initial collection sized for client-side discovery

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Retro-Pixel Identity**: PASS with design requirement. Public and Backstage surfaces use the established pixel-art identity, required typography, and decorative patterns where designs call for them.
- **II. Material Theme as Single Source of Truth**: PASS with implementation constraint. Light, dark, and contrast variants consume shared Material Theme Builder tokens; components do not own hard-coded colors.
- **III. Accessibility & Theming**: PASS. Theme selection persists, applies before content is shown, and all public/admin states target WCAG AA contrast.
- **IV. Fast Client-Side First Recipe Discovery**: PASS. Search/filter computations stay client-side for the initial dataset; checklist and serving scaling are reusable detail capabilities.
- **V. Simplicity & Practicality**: PASS. The plan keeps public workflows direct and uses a server boundary only where persistence and authorization require it.
- **VI. Secure, Auditable Admin Dashboard**: PASS. Backstage reads and mutations require server-validated admin sessions; successful recipe changes create audit records.
- **VII. Test What Breaks Dinner Plans**: PASS with sequencing constraint. Automated tests for filtering, scaling, and authorization are planned after implementation code receives user review, as required by the constitution.

**Gate result**: PASS. No unjustified constitution violations.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── app/
│   ├── routes/
│   └── theme/
├── components/
│   ├── recipe/
│   └── shared/
├── features/
│   ├── discovery/
│   ├── recipe-detail/
│   └── backstage/
├── lib/
│   ├── recipe-filtering.ts
│   └── serving-scaling.ts
├── models/
└── services/

server/
├── auth/
├── recipes/
├── audit/
└── storage/

tests/
├── unit/
├── integration/
└── browser/
```

**Structure Decision**: Extend the existing single Vite frontend with feature-oriented
`src/` modules and a colocated `server/` boundary for durable recipe data, sessions, and
audit records. Keep domain calculations in small reusable libraries so they can be tested
without rendering. Add tests under `tests/` only after the implementation code has been
reviewed and approved, per Principle VII.

## Post-Design Constitution Check

- **I / II / III**: The design keeps all visual decisions inside the shared theme layer and
  requires typography, pixel identity, contrast, focus, and no-flash behavior on both route
  families.
- **IV**: Recipe filtering is a pure client-side operation over the loaded collection;
  server calls are reserved for loading or mutating data rather than each filter keystroke.
- **V**: The server boundary is limited to the capabilities that cannot be safely implemented
  as client-only state: durable catalog changes, sessions, and audit history.
- **VI**: Backstage route loaders and mutation handlers validate the authenticated admin
  session independently of client navigation or hidden controls.
- **VII**: The quickstart identifies the required automated checks, with test authoring
  sequenced after implementation review.

**Post-design gate result**: PASS. No constitution violations introduced by the design.

## Complexity Tracking

No violations requiring justification.
