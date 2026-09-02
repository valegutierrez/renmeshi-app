# Implementation Plan: Canonical Seigaiha and Logo Color Variants

**Branch**: `003-seigaiha-logo-variants` | **Date**: 2026-09-02 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/003-seigaiha-logo-variants/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Replace the current decorative and brand-color treatments with constitution-compliant
semantic theme bindings. Add the canonical `src/assets/seigaiha-pattern.svg` to the
existing surfaces that call for the pattern, expose `Primary`, `On Primary`, and
`Outline Variant` through the shared theme token layer for every supported mode, and
bind the square logo and footer surface to those tokens. Preserve the existing
`renmeshi letters.svg` header wordmark and responsive layout.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 6.0.2, CSS, React 19.2.8

**Primary Dependencies**: React, Vite 8.2.2, Material UI theme conventions, Playwright, Vitest

**Storage**: N/A

**Testing**: Vitest unit tests, Playwright browser tests, `npm run lint`, `npm run build`

**Target Platform**: Modern desktop and mobile browsers

**Project Type**: React/Vite web application

**Performance Goals**: Theme switching and visual updates occur without visible flash or layout shift; no additional network request is needed for token or asset changes.

**Constraints**: Only constitution-approved SVG assets may be used; colors must come from shared semantic tokens; all four theme/contrast modes must remain in parity; responsive layouts must avoid clipping and horizontal overflow.

**Scale/Scope**: Existing public homepage, About Us, recipe detail, and Backstage surfaces that use the shared shell or decorative bands; one canonical seigaiha asset and one square logo asset.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Passes before research:

- Principle I: The plan uses the supplied typography and approved `renmeshi.svg`,
  `renmeshi letters.svg`, and `seigaiha-pattern.svg` assets; no generated pattern is planned.
- Principle II: All new color bindings are semantic Material Theme tokens, with seigaiha
  restricted to `Outline Variant` and the square logo restricted to `Primary`/`On Primary`.
- Principle III: Light, dark, medium-contrast, and high-contrast token parity and WCAG AA
  contrast checks are explicit acceptance conditions.
- Principle V: Changes stay within the existing token layer and shell styles; no new
  abstraction or service is introduced.
- Principle VII: Automated checks cover the asset and token mappings before completion.

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
├── App.css                         # shared surface, footer, and decorative styles
├── app/
│   ├── AppShell.tsx                # shared header/footer asset surfaces
│   └── theme/
│       └── tokens.css              # semantic tokens for all modes
└── assets/
  ├── seigaiha-pattern.svg       # canonical pattern
  ├── renmeshi.svg                # square logo
  └── renmeshi letters.svg        # header wordmark

tests/
├── browser/
│   └── theme.spec.ts               # theme and surface behavior
└── unit/
  └── theme-tokens.test.ts        # token and contrast assertions
```

**Structure Decision**: Extend the existing single React/Vite application. Theme
semantics belong in `src/app/theme/tokens.css`; shared logo and footer structure remains
in `src/app/AppShell.tsx`; decorative pattern styling remains in `src/App.css` or a
nearby shared style module. Add focused unit/browser coverage under the existing
`tests/unit` and `tests/browser` directories. No backend, persistence, or public API
contract is affected.

## Post-Design Constitution Check

Passes after Phase 1 design:

- The design names the single approved seigaiha SVG and forbids alternate/generated
  treatments, satisfying Principle I.
- The design routes pattern and logo colors through shared semantic tokens and specifies
  `Outline Variant`, `Primary`, and `On Primary` mode parity, satisfying Principles II–III.
- The design keeps the existing shell and adds no unnecessary abstraction, satisfying
  Principle V.
- The design includes source-level, unit, browser, lint, and build validation for the
  required asset and theme invariants, satisfying Principle VII.

Post-design gate status: PASS. No violation or exception is recorded.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | The feature fits the existing token, shell, and test structure. |
