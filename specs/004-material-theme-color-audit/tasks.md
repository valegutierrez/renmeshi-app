# Tasks: Material Theme Color Audit

**Input**: Design documents from `/specs/004-material-theme-color-audit/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui-color-contract.md](contracts/ui-color-contract.md), [quickstart.md](quickstart.md)

**Tests**: Included because the feature specification requires repeatable palette validation, four-mode accessibility checks, and regression detection for prohibited colors.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the approved palette inventory and audit scope before changing styles.

- [X] T001 [P] Inventory every visible color declaration, theme token, effect, and interaction state in `src/App.css`, `src/index.css`, `src/app/theme/tokens.css`, and `src/app/theme/typography.css`.
- [X] T002 [P] Record the approved Material Theme roles, tones, and four mode mappings in `specs/004-material-theme-color-audit/data-model.md` and `specs/004-material-theme-color-audit/contracts/ui-color-contract.md`.
- [X] T003 [P] Document the audit commands, expected failure behavior, and temporary controlled-regression procedure in `specs/004-material-theme-color-audit/quickstart.md`.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish one semantic source of truth before story-specific cleanup begins.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

- [X] T004 Define complete semantic Material Theme roles and approved values for light, dark, medium-contrast, and high-contrast modes in `src/app/theme/tokens.css`.
- [X] T005 Replace legacy root color variables and starter color-scheme declarations with aliases to the shared semantic token layer in `src/index.css`.
- [X] T006 Remove custom palette variables and hard-coded visible colors from the shared aliases and state foundations in `src/App.css`.
- [X] T007 Define the audit policy and approved exception shape in `tests/unit/color-policy.test.ts`, covering hard-coded values, derived effects, custom color names, and missing mode coverage.
- [X] T008 Add four-mode token coverage and WCAG contrast helpers to `tests/unit/color-policy.test.ts` using the approved Material Theme role inventory from `src/app/theme/tokens.css`.

## Phase 3: User Story 1 - Consistent Material Theme Palette (Priority: P1) 🎯 MVP

**Goal**: Remove unapproved visible colors and make every public and admin surface resolve through the Material Theme semantic palette.

**Independent Test**: Run the color-policy unit tests and inspect public and admin routes for zero unapproved declarations, custom variants, or derived palette effects.

### Tests for User Story 1

- [X] T009 [US1] Add source-level assertions that public and admin styles contain no custom color variants or hard-coded visible colors in `tests/unit/color-policy.test.ts`.
- [X] T010 [US1] Add source-level assertions that all visible state selectors in `src/App.css` and `src/index.css` consume approved semantic tokens in `tests/unit/color-policy.test.ts`.

### Implementation for User Story 1

- [X] T011 [US1] Replace custom accent, surface, border, shadow, and state usages with approved semantic roles throughout `src/App.css`.
- [X] T012 [US1] Replace starter shell color declarations, background values, and color-scheme overrides with approved semantic roles in `src/index.css`.
- [X] T013 [US1] Update public recipe, About Us, and shared-shell surfaces to preserve existing hierarchy while consuming only approved roles in `src/App.css` and `src/app/AppShell.tsx`.
- [X] T014 [US1] Update Backstage controls, notices, history rows, form states, and validation messages to consume only approved roles in `src/App.css` and `src/features/backstage/BackstagePage.tsx`.
- [X] T015 [US1] Remove unused custom palette names and any associated selectors from `src/App.css`, `src/index.css`, and `src/App.tsx` without changing layout or interaction behavior.

**Checkpoint**: User Story 1 is independently functional and source-policy tests reject prohibited palette additions.

## Phase 4: User Story 2 - Readable Theme Variants (Priority: P1)

**Goal**: Preserve readable text, controls, focus states, and canonical visual assets in all four supported presentation modes.

**Independent Test**: Run the browser color checks across light, dark, medium-contrast, and high-contrast modes and confirm WCAG AA contrast, mode persistence, and no visual overflow.

### Tests for User Story 2

- [X] T016 [US2] Add browser assertions for text, controls, focus indicators, and state contrast across all four modes in `tests/browser/color-audit.spec.ts`.
- [X] T017 [US2] Add browser assertions for canonical seigaiha, logo, wordmark, and responsive overflow behavior in `tests/browser/color-audit.spec.ts`.

### Implementation for User Story 2

- [X] T018 [US2] Correct semantic foreground/background pairings for public bands, cards, filters, empty states, and links in `src/App.css` so each supported mode remains legible.
- [X] T019 [US2] Correct semantic foreground/background pairings for Backstage forms, notices, history, and authentication states in `src/App.css` and `src/features/backstage/BackstagePage.tsx`.
- [X] T020 [US2] Verify theme bootstrap and persisted mode selection continue to apply the complete semantic token set without flash or layout shift in `src/app/theme/theme-bootstrap.ts`, `src/app/theme/theme-provider.tsx`, and `src/app/theme/tokens.css`.
- [X] T021 [US2] Preserve canonical seigaiha `Outline Variant` mapping and logo `Primary`/`On Primary` mapping while completing mode-specific contrast checks in `src/App.css`, `src/app/AppShell.tsx`, and `tests/browser/visual-assets.spec.ts`.

**Checkpoint**: User Stories 1 and 2 are independently functional and readable in every supported mode.

## Phase 5: User Story 3 - Reviewable Color Exceptions (Priority: P2)

**Goal**: Make palette violations and any approved exception reviewable and resistant to regression.

**Independent Test**: Add a temporary prohibited color in a controlled change, run the policy validation, and verify it reports the affected rule before the temporary change is removed.

### Tests for User Story 3

- [X] T022 [US3] Add regression cases for coral, violet, gold, lime, hard-coded colors, opacity-derived colors, and gradient/effect treatments in `tests/unit/color-policy.test.ts`.
- [X] T023 [US3] Add a controlled fixture and assertion proving an unapproved color is reported with its source location in `tests/unit/color-policy.test.ts`.

### Implementation for User Story 3

- [X] T024 [US3] Document the final approved role inventory, exception record requirements, and review ownership in `specs/004-material-theme-color-audit/contracts/ui-color-contract.md` and `specs/004-material-theme-color-audit/quickstart.md`.
- [X] T025 [US3] Add a concise contributor-facing palette audit reference to `README.md` linking the constitution, color contract, and validation commands.

**Checkpoint**: All user stories are independently testable and future palette violations have a documented detection path.

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete feature and protect existing behavior.

- [X] T026 [P] Run `npm run lint` and resolve only feature-related diagnostics in `src/`, `tests/`, and `specs/004-material-theme-color-audit/`.
- [X] T027 [P] Run `npm run build` and confirm all semantic token references and approved asset integrations compile successfully for `src/` using the scripts declared in `package.json`.
- [X] T028 Run `npm test` and `npm run test:browser` using `specs/004-material-theme-color-audit/quickstart.md`, recording any unrelated pre-existing failures without weakening feature assertions.
- [X] T029 Review the implementation against `specs/004-material-theme-color-audit/contracts/ui-color-contract.md`, the constitution, and all FR/SC entries in `specs/004-material-theme-color-audit/spec.md`.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; T001-T003 can run in parallel.
- **Foundational (Phase 2)**: Depends on Phase 1; T004-T008 establish the shared palette and policy foundation.
- **User Story 1 (Phase 3)**: Depends on Phase 2; delivers the MVP palette cleanup.
- **User Story 2 (Phase 4)**: Depends on Phase 2 and the shared token names; can proceed after foundational work, with T021 integrating US1 asset rules.
- **User Story 3 (Phase 5)**: Depends on the completed US1 and US2 source surfaces and their tests.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 and has no dependency on another story.
- **User Story 2 (P1)**: Can start after Phase 2; shares semantic tokens with US1 but remains independently testable through browser checks.
- **User Story 3 (P2)**: Depends on US1 and US2 so its regression checks cover the final palette and contrast behavior.

### Parallel Opportunities

- T001-T003 can run in parallel because they update separate documentation or inventory surfaces.
- T007-T008 are sequential because they extend the same policy test file.
- T009-T010 are sequential because they extend the same policy test file.
- T016-T017 are sequential because they extend the same browser test file.
- T022-T023 are sequential because they extend the same policy test file.
- T026-T027 can run in parallel after implementation is complete.

## Parallel Example: User Story 1

```text
Task: "Add source-level custom-color rejection in tests/unit/color-policy.test.ts"
Task: "Add semantic-token usage assertions in tests/unit/color-policy.test.ts"
```

## Parallel Example: User Story 2

```text
Task: "Add four-mode contrast assertions in tests/browser/color-audit.spec.ts"
Task: "Add canonical asset and responsive assertions in tests/browser/color-audit.spec.ts"
```

## Parallel Example: User Story 3

```text
Task: "Add prohibited color regression cases in tests/unit/color-policy.test.ts"
Task: "Add controlled violation reporting fixture in tests/unit/color-policy.test.ts"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup and Phase 2 foundational token/policy work.
2. Complete Phase 3 User Story 1 palette cleanup.
3. Run the US1 policy tests and verify public/admin styles contain only approved semantic roles.
4. Stop for review before extending the contrast and exception coverage.

### Incremental Delivery

1. Complete Setup + Foundational and establish the approved palette inventory.
2. Add User Story 1 and validate the source-level palette cleanup.
3. Add User Story 2 and validate all four modes in the browser.
4. Add User Story 3 and validate controlled regression detection.
5. Run the complete quickstart validation before release.

## Notes

- Every task starts with `- [ ]`, has a sequential ID, and includes an exact repository path.
- `[P]` marks tasks that can work independently without depending on incomplete work in another file.
- `[US1]`, `[US2]`, and `[US3]` map directly to the three stories in `spec.md`.
- No backend, persistence, or public API tasks are required.
