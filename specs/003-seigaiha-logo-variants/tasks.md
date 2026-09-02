# Tasks: Canonical Seigaiha and Logo Color Variants

**Input**: Design documents from `/specs/003-seigaiha-logo-variants/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui-visual-contract.md](contracts/ui-visual-contract.md), [quickstart.md](quickstart.md)

**Tests**: Included because `FR-010` explicitly requires automated checks for asset usage, token mappings, footer pairing, and theme-mode parity.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the feature test surfaces and confirm the existing asset/theme paths before implementation.

- [ ] T001 [P] Add the feature asset and theme validation test file at `tests/unit/visual-assets.test.ts`.
- [ ] T002 [P] Add the feature browser validation file at `tests/browser/visual-assets.spec.ts`.
- [ ] T003 [P] Record the canonical asset and token invariants in `specs/003-seigaiha-logo-variants/contracts/ui-visual-contract.md` for implementation traceability.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Provide the shared semantic token foundation required by both visual user stories.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

- [ ] T004 Define `Primary`, `On Primary`, and `Outline Variant` semantic CSS variables for light, dark, medium-contrast, and high-contrast modes in `src/app/theme/tokens.css`.
- [ ] T005 [P] Add stable semantic aliases for the new theme variables in `src/App.css` without changing unrelated palette behavior in `src/App.css`.
- [ ] T006 [P] Verify the canonical SVG files exist and retain `fill:currentColor` in `src/assets/seigaiha-pattern.svg` and `src/assets/renmeshi.svg`.
- [ ] T007 Implement unit assertions for token presence and four-mode token coverage in `tests/unit/visual-assets.test.ts`.

---

## Phase 3: User Story 1 - Consistent Seigaiha Decoration (Priority: P1) 🎯 MVP

**Goal**: Render the one approved seigaiha asset on required decorative surfaces using only the active `Outline Variant` token in every supported mode.

**Independent Test**: Run `npm test -- tests/unit/visual-assets.test.ts` and `npm run test:browser -- tests/browser/visual-assets.spec.ts`; confirm the canonical asset is rendered, no generated/alternate pattern is used, and all four modes expose the correct pattern color.

### Tests for User Story 1

- [ ] T008 [P] [US1] Add source-level assertions that seigaiha surfaces reference only `src/assets/seigaiha-pattern.svg` and reject generated or alternate pattern treatments in `tests/unit/visual-assets.test.ts`.
- [ ] T009 [P] [US1] Add browser assertions for visible seigaiha rendering and `Outline Variant` color resolution across light, dark, medium-contrast, and high-contrast modes in `tests/browser/visual-assets.spec.ts`.

### Implementation for User Story 1

- [ ] T010 [US1] Replace the existing generated wave decoration with a canonical `src/assets/seigaiha-pattern.svg` background and bind its color to `Outline Variant` in `src/App.css`.
- [ ] T011 [US1] Apply the canonical seigaiha treatment to each existing required decorative surface while preserving spacing and responsive behavior in `src/App.css`.
- [ ] T012 [US1] Expose deterministic selectors or accessible surface hooks needed by the seigaiha browser checks without duplicating the pattern markup in `src/App.tsx` and `src/app/AppShell.tsx`.

**Checkpoint**: User Story 1 is independently functional and verifiable as the MVP.

---

## Phase 4: User Story 2 - Surface-Appropriate Renmeshi Logo (Priority: P1)

**Goal**: Keep the approved square logo and header wordmark distinct while using `Primary`/`On Primary` tokens correctly, including the `Primary` footer and `On Primary` logo pairing.

**Independent Test**: Run the logo browser checks in all supported modes and confirm the footer background resolves to `Primary`, the square logo resolves to `On Primary`, and the header continues to use `renmeshi letters.svg`.

### Tests for User Story 2

- [ ] T013 [P] [US2] Add source-level assertions for `renmeshi.svg` usage, permitted `Primary`/`On Primary` bindings, and continued `renmeshi letters.svg` wordmark usage in `tests/unit/visual-assets.test.ts`.
- [ ] T014 [P] [US2] Add browser assertions for footer background/logo pairing, logo legibility, wordmark preservation, and four-mode behavior in `tests/browser/visual-assets.spec.ts`.

### Implementation for User Story 2

- [ ] T015 [US2] Bind the footer background to the semantic `Primary` token and the `renmeshi.svg` currentColor to `On Primary` in `src/App.css`.
- [ ] T016 [US2] Preserve the header `renmeshi letters.svg` wordmark and assign any square-logo surface to only the allowed `Primary` or `On Primary` token in `src/app/AppShell.tsx` and `src/App.css`.
- [ ] T017 [US2] Preserve logo artwork, aspect ratio, pixel rendering, and narrow-screen layout behavior in `src/app/AppShell.tsx` and `src/App.css`.

**Checkpoint**: User Stories 1 and 2 are independently functional and verifiable.

---

## Phase 5: User Story 3 - Maintainable Asset Rules (Priority: P2)

**Goal**: Make the canonical asset and semantic color invariants easy to review and resistant to regression.

**Independent Test**: Run the complete unit, browser, lint, and build validation from `specs/003-seigaiha-logo-variants/quickstart.md` and verify the source-level rules fail when an alternate asset or disallowed color binding is introduced.

### Tests for User Story 3

- [ ] T018 [P] [US3] Add regression assertions for prohibited alternate/generated seigaiha implementations and disallowed logo colors in `tests/unit/visual-assets.test.ts`.
- [ ] T019 [P] [US3] Add responsive viewport and no-horizontal-overflow checks for the pattern and logos in `tests/browser/visual-assets.spec.ts`.

### Implementation for User Story 3

- [ ] T020 [US3] Add stable test identifiers or semantic class names for the canonical pattern and logo surfaces in `src/App.css` and `src/app/AppShell.tsx`.
- [ ] T021 [US3] Document the final asset-to-token mapping and validation commands in `specs/003-seigaiha-logo-variants/quickstart.md`.

**Checkpoint**: All user stories are independently testable and the feature invariants are documented.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete feature and protect existing behavior.

- [ ] T022 [P] Run `npm run lint` and resolve only feature-related diagnostics in `src/App.css`, `src/app/AppShell.tsx`, `src/app/theme/tokens.css`, and `tests/`.
- [ ] T023 [P] Run `npm run build` and confirm the canonical SVG imports and semantic token references compile successfully in `src/app/AppShell.tsx`, `src/app/theme/tokens.css`, and `src/App.css`.
- [ ] T024 [P] Run `npm test` and `npm run test:browser` using the scenarios in `specs/003-seigaiha-logo-variants/quickstart.md`.
- [ ] T025 Review the final implementation against [contracts/ui-visual-contract.md](contracts/ui-visual-contract.md) and update `specs/003-seigaiha-logo-variants/plan.md` only if an approved design decision changed.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; T001-T003 can run in parallel.
- **Foundational (Phase 2)**: Depends on Phase 1; T005-T007 can run in parallel after T004 where applicable.
- **User Story 1 (Phase 3)**: Depends on Phase 2; T008-T009 can be prepared in parallel, then T010-T012 implement the story.
- **User Story 2 (Phase 4)**: Depends on Phase 2 and can proceed in parallel with User Story 1; its browser checks may share the test file but must be coordinated with US1 edits.
- **User Story 3 (Phase 5)**: Depends on the completed US1 and US2 surfaces because it validates their combined invariants.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational phase; no dependency on another user story.
- **User Story 2 (P1)**: Can start after Foundational phase; independent of User Story 1 except for shared theme tokens.
- **User Story 3 (P2)**: Depends on User Stories 1 and 2 so its regression checks cover the completed asset bindings.

### Parallel Opportunities

- T001, T002, and T003 can run in parallel during setup.
- T005 and T006 can run in parallel after the token naming is agreed in T004.
- T008 and T009 can run in parallel within User Story 1.
- User Stories 1 and 2 can be implemented in parallel by separate contributors after Phase 2, with coordination for shared test files.
- T013 and T014 can run in parallel within User Story 2.
- T018 and T019 can run in parallel within User Story 3.
- T022 and T023 can run in parallel; T024 follows their source corrections.

---

## Parallel Example: User Story 1

```text
Task: T008 [US1] Add source-level canonical seigaiha assertions in tests/unit/visual-assets.test.ts
Task: T009 [US1] Add browser Outline Variant checks in tests/browser/visual-assets.spec.ts
```

## Parallel Example: User Story 2

```text
Task: T013 [US2] Add source-level logo/token assertions in tests/unit/visual-assets.test.ts
Task: T014 [US2] Add browser footer pairing checks in tests/browser/visual-assets.spec.ts
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup and Phase 2 foundational token work.
2. Complete Phase 3 User Story 1.
3. Run the independent User Story 1 tests and confirm canonical seigaiha rendering in all four modes.
4. Stop for review/demo before adding logo behavior.

### Incremental Delivery

1. Complete Setup and Foundational phases.
2. Deliver User Story 1 as the visual-pattern MVP.
3. Deliver User Story 2 with footer and logo token pairing.
4. Deliver User Story 3 with regression and responsive checks.
5. Run the complete quickstart validation before release.

### Parallel Team Strategy

1. Complete shared token naming in Phase 2 together.
2. Assign User Story 1 to one contributor and User Story 2 to another after the foundation is stable.
3. Assign User Story 3 after both visual surfaces are integrated.
4. Run cross-cutting validation as a final coordinated step.

## Notes

- Every task starts with `- [ ]`, has a sequential task ID, and includes a concrete repository path.
- `[P]` marks only tasks that can work on independent files or isolated validation surfaces.
- `[US1]`, `[US2]`, and `[US3]` map directly to the priorities and stories in `spec.md`.
- No backend, persistence, or API tasks are required for this feature.
