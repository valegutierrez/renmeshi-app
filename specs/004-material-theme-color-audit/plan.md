# Implementation Plan: Material Theme Color Audit

**Branch**: `004-material-theme-color-audit` | **Date**: 2026-09-02 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/004-material-theme-color-audit/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Audit every visible application color against the approved Material Theme Builder export and
replace unapproved custom or derived colors with semantic roles. Reuse the existing shared
theme-token layer, document the surface bindings, and add source-level, unit, browser, lint,
and build validation without changing layout or interaction behavior unnecessarily.

## Technical Context

**Language/Version**: TypeScript 6.0.2, CSS, React 19.2.8

**Primary Dependencies**: React, Vite 8.2.2, existing theme provider/token layer, Vitest,
Playwright, Oxlint

**Storage**: N/A

**Testing**: Vitest unit tests, Playwright browser tests, `npm run lint`, `npm run build`

**Target Platform**: Modern desktop and mobile browsers

**Project Type**: React/Vite web application

**Performance Goals**: Palette validation must not add user-visible layout shift or a flash of
an unrelated theme; existing navigation and interaction responsiveness must remain unchanged.

**Constraints**: Only Material Theme export roles and tones may produce visible UI colors;
custom, hard-coded, opacity-derived, or effect-derived colors are prohibited unless explicitly
approved. All four modes must remain covered and WCAG AA contrast must be preserved.

**Scale/Scope**: Existing public homepage, About Us, recipe detail, and Backstage surfaces,
including shared shell, controls, interaction states, and canonical visual assets.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Passes before research:

- Principle I: Canonical artwork and typography remain unchanged; seigaiha and logo bindings
  continue to use their existing approved asset rules.
- Principle II: The feature makes the Material Theme export the sole color authority and
  removes custom variants, while preserving mockup-inspired layout and tone.
- Principle III: Four-mode parity, no theme flash, and WCAG AA contrast are explicit outcomes.
- Principle V: The design reuses the existing token layer and introduces no unnecessary
  abstraction or service.
- Principle VII: Automated validation is required for palette rules and existing journeys.

Gate status: PASS. No constitution violation or exception is required.

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
├── App.css                         # shared surface and state styles
├── App.tsx                         # public routes and visible application surfaces
├── app/
│   ├── AppShell.tsx                # shared header/footer surfaces
│   └── theme/
│       ├── tokens.css              # semantic values for all supported modes
│       └── theme-provider.tsx      # persisted theme selection
└── assets/                         # approved artwork and fonts

tests/
├── browser/                        # end-to-end theme and journey checks
└── unit/                           # token and palette policy checks
```

**Structure Decision**: Extend the existing single React/Vite application. Palette values
remain in the shared theme layer; consuming styles remain in existing application styles and
components. Add focused policy and browser validation under the existing test directories.
The feature has no backend, persistence, or public API changes.

## Post-Design Constitution Check

Passes after Phase 1 design:

- The research and UI contract make Material Theme export roles and tones the only approved
  visible color source, satisfying Principle II.
- The data model preserves semantic role bindings, four-mode parity, WCAG AA evidence, and
  the canonical seigaiha/logo constraints from Principles I-III.
- The plan changes only existing visual bindings and validation surfaces, satisfying Principle V.
- The quickstart requires repeatable unit, browser, lint, and build checks, satisfying
  Principle VII.

Post-design gate status: PASS. No violation or exception is recorded.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | The feature fits the existing token, shell, and test structure. |
