---

description: "Executable task list for the core Renmeshi recipe experience"
---

# Tasks: Core Renmeshi Recipe Experience

**Input**: Design documents from `/specs/001-recipe-experience/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), and [quickstart.md](./quickstart.md)

**Tests**: Required by the feature specification and Constitution Principle VII. Author tests after the corresponding implementation code has been reviewed and approved.

**Organization**: Tasks are grouped by user story so each story can be implemented, tested, and demonstrated as an independent increment after shared foundations are complete.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the full-stack TypeScript structure and development commands without changing user-facing behavior.

- [ ] T001 Create the planned frontend and server directories under `src/`, `server/`, and `tests/` without adding unused framework scaffolding.
- [ ] T002 [P] Add the approved TypeScript-compatible unit, integration, and browser test dependencies and test scripts in `package.json`.
- [ ] T003 [P] Add server development/build entry points and environment variable documentation in `server/index.ts` and `.env.example`.
- [ ] T004 [P] Configure test, browser, and TypeScript path settings in `vitest.config.ts`, `playwright.config.ts`, and `tsconfig.json`.
- [ ] T005 [P] Define shared recipe, ingredient, history, session, and theme types in `src/models/recipe.ts`, `src/models/auth.ts`, and `src/models/theme.ts`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the shared boundaries required by every user story before story-specific work begins.

**Critical**: No user story implementation should begin until this phase is complete.

- [ ] T006 Implement durable recipe and recipe-history storage adapters with atomic successful-mutation-plus-history behavior in `server/storage/recipe-store.ts`.
- [ ] T007 [P] Implement server-side admin credential verification, session creation/expiration, sign-out invalidation, and authorization middleware in `server/auth/auth-service.ts` and `server/auth/require-admin.ts`.
- [ ] T008 [P] Implement server request parsing, validation errors, and consistent success/error responses in `server/http/errors.ts` and `server/http/response.ts`.
- [ ] T009 [P] Implement server route registration and health/configuration bootstrapping in `server/index.ts` and `server/http/router.ts`.
- [ ] T010 [P] Create the shared Material Theme Builder token layer with light, dark, medium-contrast, and high-contrast mappings in `src/app/theme/tokens.css` and `src/app/theme/theme-provider.tsx`.
- [ ] T011 [P] Add pre-paint theme preference initialization and resilient browser preference storage in `src/app/theme/theme-bootstrap.ts` and `src/app/theme/theme-storage.ts`.
- [ ] T012 Create shared application shell, route handling, focus styling, responsive layout primitives, and theme control mounting points in `src/app/AppShell.tsx`, `src/app/routes.tsx`, and `src/components/shared/ThemeToggle.tsx`.
- [ ] T013 [P] Load required Raleway, Poppins, and Pixelpori font assets and shared pixel-art/seigaiha styling through the token layer in `src/app/theme/typography.css` and `src/index.css`.
- [ ] T014 [P] Add a seeded development recipe collection and safe admin configuration fixture in `server/storage/seed.ts` and `server/auth/seed-admin.ts`.

**Checkpoint**: Foundation ready. Public and protected route shells, shared types, theme tokens, server validation, durable storage, and authorization are available for story implementation.

---

## Phase 3: User Story 1 - Find a Recipe for Tonight (Priority: P1) 🎯 MVP

**Goal**: Let an unauthenticated visitor browse the full collection and instantly combine category, cooking-time, and keyword filters.

**Independent Test**: With a representative seeded collection, apply each filter alone and all filters together, verify case-insensitive whitespace-normalized matching and no-match recovery, and confirm no page reload or loading spinner occurs.

### Tests for User Story 1

> **Note**: Author and run these tests after the implementation code in this story has been reviewed and approved, as required by Constitution Principle VII.

- [ ] T015 [P] [US1] Add unit coverage for category, cooking-time boundaries, normalized keyword matching, conjunctive filters, and empty results in `tests/unit/recipe-filtering.test.ts`.
- [ ] T016 [P] [US1] Add browser coverage for public collection rendering, filter combinations, immediate result updates, no-match state, and reset/change-filter recovery in `tests/browser/discovery.spec.ts`.

### Implementation for User Story 1

- [ ] T017 [P] [US1] Implement typed recipe collection loading and public recipe read service in `src/services/recipe-service.ts` and `server/recipes/recipe-read-service.ts`.
- [ ] T018 [P] [US1] Implement pure normalized text, category, cooking-time-band, and combined filtering functions in `src/lib/recipe-filtering.ts`.
- [ ] T019 [P] [US1] Create recipe filter controls for category, cooking-time band, and free-text search with accessible labels and reset behavior in `src/features/discovery/RecipeFilters.tsx`.
- [ ] T020 [US1] Create responsive recipe result cards and actionable empty state in `src/features/discovery/RecipeCard.tsx` and `src/features/discovery/RecipeEmptyState.tsx`.
- [ ] T021 [US1] Compose the public collection route with client-side filtering and no per-input network requests in `src/features/discovery/RecipeCollectionPage.tsx` and `src/app/routes.tsx`.
- [ ] T022 [US1] Add recipe navigation from result cards to detail routes while preserving shared shell and theme controls in `src/features/discovery/recipe-links.ts` and `src/app/routes.tsx`.

**Checkpoint**: User Story 1 is independently usable as the MVP public discovery experience.

---

## Phase 4: User Story 2 - Cook From a Recipe (Priority: P1)

**Goal**: Give a home cook a clear detail view with proportional serving scaling, a recipe-scoped ingredient checklist, and highly visible ordered instructions.

**Independent Test**: Open one recipe, change servings, verify numeric quantities and preserved units, check/uncheck ingredients, switch recipes, and confirm instructions remain ordered and visible.

### Tests for User Story 2

> **Note**: Author and run these tests after the implementation code in this story has been reviewed and approved, as required by Constitution Principle VII.

- [ ] T023 [P] [US2] Add unit coverage for proportional scaling, invalid serving values, unit preservation, and non-scalable ingredient text in `tests/unit/serving-scaling.test.ts`.
- [ ] T024 [P] [US2] Add browser coverage for detail metadata, serving controls, ingredient toggles, recipe-scoped persistence, and ordered instructions in `tests/browser/recipe-detail.spec.ts`.

### Implementation for User Story 2

- [ ] T025 [P] [US2] Implement structured ingredient quantity scaling and valid-serving normalization in `src/lib/serving-scaling.ts`.
- [ ] T026 [P] [US2] Implement recipe-scoped checklist state persistence and toggle behavior in `src/features/recipe-detail/useIngredientChecklist.ts` and `src/services/recipe-preferences.ts`.
- [ ] T027 [P] [US2] Create serving-size controls with invalid-input recovery and current-serving feedback in `src/features/recipe-detail/ServingScaler.tsx`.
- [ ] T028 [P] [US2] Create accessible ingredient checklist rendering scaled quantities and preserved descriptive text in `src/features/recipe-detail/IngredientChecklist.tsx`.
- [ ] T029 [P] [US2] Create high-visibility ordered instruction list and recipe metadata panel in `src/features/recipe-detail/InstructionList.tsx` and `src/features/recipe-detail/RecipeMeta.tsx`.
- [ ] T030 [US2] Compose the recipe detail route and integrate navigation from the public collection in `src/features/recipe-detail/RecipeDetailPage.tsx` and `src/app/routes.tsx`.

**Checkpoint**: User Stories 1 and 2 are independently demonstrable as discovery plus cooking workflow.

---

## Phase 5: User Story 3 - Use the App Comfortably in Either Theme (Priority: P2)

**Goal**: Make light/dark theming persistent, instant, and legible across public and Backstage screens.

**Independent Test**: Switch themes from collection, detail, sign-in, and Backstage screens; reload and navigate between routes; verify pre-paint persistence, contrast, focus states, and responsive readability.

### Tests for User Story 3

> **Note**: Author and run these tests after the implementation code in this story has been reviewed and approved, as required by Constitution Principle VII.

- [ ] T031 [P] [US3] Add browser coverage for theme switching, persistence after reload, pre-paint preference application, public/admin route parity, keyboard focus, and narrow-screen layout in `tests/browser/theme.spec.ts`.
- [ ] T032 [P] [US3] Add automated token/contrast assertions for light, dark, medium-contrast, and high-contrast states in `tests/unit/theme-tokens.test.ts`.

### Implementation for User Story 3

- [ ] T033 [US3] Integrate the shared theme provider, bootstrap, and toggle into every public and admin route in `src/app/AppShell.tsx`, `src/app/theme/theme-provider.tsx`, and `src/components/shared/ThemeToggle.tsx`.
- [ ] T034 [US3] Complete light/dark/contrast token coverage for controls, text, surfaces, borders, focus indicators, errors, and empty states in `src/app/theme/tokens.css` and `src/index.css`.
- [ ] T035 [US3] Audit responsive theme layouts and remove component-level color bypasses or typography substitutions in `src/components/`, `src/features/`, and `src/app/`.

**Checkpoint**: All existing public flows and the admin shell remain usable in both themes with persistent pre-paint preference application.

---

## Phase 6: User Story 4 - Manage the Recipe Catalog in Backstage (Priority: P2)

**Goal**: Let an authenticated admin sign in, review history, create and edit recipes, and sign out while enforcing authorization at the server boundary.

**Independent Test**: Request Backstage signed out, sign in with valid admin credentials, create and edit a valid recipe, verify public visibility and history actor/timestamps, submit invalid data, then sign out and repeat protected requests.

### Tests for User Story 4

> **Note**: Author and run these tests after the implementation code in this story has been reviewed and approved, as required by Constitution Principle VII.

- [ ] T036 [P] [US4] Add integration coverage for sign-in, sign-out, expired sessions, protected reads, rejected unauthenticated mutations, and server-side admin authorization in `tests/integration/auth-authorization.test.ts`.
- [ ] T037 [P] [US4] Add integration coverage for valid create/edit persistence, field validation, atomic audit history, failed mutation behavior, and timestamp/actor fields in `tests/integration/recipe-management.test.ts`.
- [ ] T038 [P] [US4] Add browser coverage for signed-out redirects, admin create/edit forms, history display, validation feedback, sign-out, and public catalog reflection in `tests/browser/backstage.spec.ts`.

### Implementation for User Story 4

- [ ] T039 [P] [US4] Implement protected recipe read, create, edit, and history handlers with request validation and authenticated admin checks in `server/recipes/recipe-routes.ts` and `server/audit/history-service.ts`.
- [ ] T040 [P] [US4] Implement sign-in, sign-out, session status, and protected-route redirect services in `src/services/auth-service.ts` and `src/features/backstage/require-admin.ts`.
- [ ] T041 [P] [US4] Create validated recipe editor fields for name, category, cooking time, servings, ingredients, and ordered instructions in `src/features/backstage/RecipeEditorForm.tsx`.
- [ ] T042 [P] [US4] Create Backstage sign-in page and sign-out control with actionable authentication errors in `src/features/backstage/SignInPage.tsx` and `src/features/backstage/SignOutButton.tsx`.
- [ ] T043 [P] [US4] Create authenticated history view with recipe, action, actor, and localized timestamp in `src/features/backstage/RecipeHistory.tsx`.
- [ ] T044 [US4] Compose Backstage dashboard, create/edit routes, protected navigation, and success/error feedback in `src/features/backstage/BackstagePage.tsx` and `src/app/routes.tsx`.
- [ ] T045 [US4] Verify successful create/edit operations refresh the public collection and record history only after durable storage succeeds in `src/services/recipe-service.ts` and `server/storage/recipe-store.ts`.

**Checkpoint**: All four user stories are independently demonstrable, with Backstage mutations protected by server-side authorization and auditable on success.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Complete security, accessibility, performance, documentation, and end-to-end validation across the feature.

- [ ] T046 [P] Add security hardening for session cookies, credential error handling, request forgery protection, and mutation input limits in `server/auth/`, `server/http/`, and `server/recipes/`.
- [ ] T047 [P] Add accessible loading, failure, empty, focus, and narrow-screen states across `src/components/`, `src/features/`, and `src/app/`.
- [ ] T048 [P] Profile public filtering against the representative collection and remove avoidable per-keystroke work in `src/lib/recipe-filtering.ts` and `src/features/discovery/`.
- [ ] T049 [P] Document local setup, admin fixture configuration, available scripts, and server prerequisites in `README.md`.
- [ ] T050 Run the full validation guide from [quickstart.md](./quickstart.md), including `npm run lint`, `npm run build`, `npm test`, and browser acceptance checks.
- [ ] T051 Confirm every feature requirement FR-001 through FR-019 and success criterion SC-001 through SC-007 against the implemented flows in `specs/001-recipe-experience/quickstart.md` and the completed test reports.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; T002-T005 can run in parallel after the directory decision in T001.
- **Foundational (Phase 2)**: Depends on T001-T005; T006-T014 block all user stories.
- **User Story 1 (Phase 3)**: Depends on T006, T008-T010, T012-T014; it is the MVP increment.
- **User Story 2 (Phase 4)**: Depends on T005, T010-T012, and the recipe type/read service from T017; it integrates with US1 navigation but remains independently testable.
- **User Story 3 (Phase 5)**: Depends on T010-T013 and the shared shell from T012; it must be verified across US1, US2, and the Backstage routes.
- **User Story 4 (Phase 6)**: Depends on T006-T009 and shared shell/theme work; it does not depend on client-only discovery logic for authorization.
- **Polish (Phase 7)**: Depends on all desired user stories and their reviewed implementation code; T050-T051 are final gates.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundation; no dependency on another user story.
- **US2 (P1)**: Starts after Foundation and shared recipe types/read service; uses US1’s detail navigation but can be tested directly by recipe identifier.
- **US3 (P2)**: Starts after Foundation; validates shared theme behavior across all route families.
- **US4 (P2)**: Starts after Foundation; server-side auth/storage are foundational, while its UI can be developed independently from public discovery.

### Parallel Opportunities

- Setup T002-T005 can run in parallel after T001.
- Foundation T007-T011, T013, and T014 can run in parallel where files do not overlap.
- After Foundation, US1, US2, US3, and US4 can be assigned to separate developers, with shared-file integration coordinated through T012 and route composition tasks.
- Within US1, T017-T020 are parallelizable before T021.
- Within US2, T025-T029 are parallelizable before T030.
- Within US3, T031-T032 can run in parallel after the reviewed implementation exists; T033-T035 touch shared theme surfaces and should be coordinated.
- Within US4, T039-T043 are parallelizable before T044; T045 follows the route and storage integration.
- Polish T046-T049 can run in parallel before T050-T051.

## Parallel Example: User Story 1

```text
Developer A: T017 public recipe read service in src/services/recipe-service.ts
Developer B: T018 filtering logic in src/lib/recipe-filtering.ts
Developer C: T019 filter controls in src/features/discovery/RecipeFilters.tsx
Developer D: T020 cards and empty state in src/features/discovery/RecipeCard.tsx and RecipeEmptyState.tsx
```

## Parallel Example: User Story 4

```text
Developer A: T039 protected recipe and history handlers in server/
Developer B: T040 auth client and route guard in src/services/ and src/features/backstage/
Developer C: T041 recipe editor form in src/features/backstage/RecipeEditorForm.tsx
Developer D: T042-T043 sign-in and history views in src/features/backstage/
```

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1 setup.
2. Complete Phase 2 foundations, including seeded recipe reads and shared shell/theme support.
3. Complete Phase 3 User Story 1.
4. After implementation review approval, author and run T015-T016.
5. Run the US1 independent test and demonstrate the public discovery MVP.

### Incremental Delivery

1. Add US2 for the cook-from-recipe detail workflow and validate it independently.
2. Add US3 for theme persistence and cross-route accessibility parity.
3. Add US4 for authenticated Backstage management and audit history.
4. Complete Phase 7 security, accessibility, performance, documentation, and full quickstart validation.

### Notes

- Every task uses the required `- [ ] T###` checklist format, with `[P]` only for independently parallelizable work and `[US#]` on user-story tasks.
- Test tasks are intentionally sequenced after implementation review approval to comply with Constitution Principle VII.
- No task introduces regular visitor accounts, ratings/comments, meal planning/calendars, or third-party recipe imports.
