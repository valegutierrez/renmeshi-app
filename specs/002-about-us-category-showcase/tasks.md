# Tasks: About Us and Homepage Category Showcase

**Input**: Design documents from `/specs/002-about-us-category-showcase/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-and-routing.md, quickstart.md

**Tests**: No test-first tasks are included. The feature spec requires browser validation and lint/build checks; automated tests are deferred until the implementation has been reviewed and approved, per the project constitution.

**Organization**: Tasks are grouped by user story so each increment can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing single-project surface and approved assets before implementation.

- [X] T001 Verify the active React/Vite entry points and preserve existing hash routes in `src/App.tsx`, `src/App.css`, and `src/index.css`
- [X] T002 [P] Verify the approved pixel-art, logo, font, and portrait assets exist under `src/assets/`, including `src/assets/pixelart/appetizer.png`, `src/assets/pixelart/main-dish.png`, `src/assets/pixelart/side-dish.png`, `src/assets/pixelart/dessert.png`, and `src/assets/creator-portrait.jpg`
- [X] T003 [P] Record the creator portrait provenance and confirm its approved crop/source for `src/assets/creator-portrait.jpg`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared route, content, typography, theme, and layout foundations required by all user stories.

**Critical**: Complete this phase before implementing either user-facing story.

- [X] T004 Define typed About Us content and four display-label-to-`RecipeCategory` mappings in `src/models/about-us.ts` and `src/models/recipe.ts`
- [X] T005 Implement shared public route selection for the homepage, About Us, and existing recipe/backstage routes in `src/App.tsx`
- [X] T006 Implement reusable public header and footer composition with the approved logo assets under `src/assets/` in `src/App.tsx`
- [X] T007 Add the local Pixelpori `@font-face`, font-role variables, spacing tokens, container geometry, and focus tokens in `src/index.css`
- [X] T008 Replace touched public-surface color literals with semantic Material theme variables and add synchronized light, dark, medium-contrast, and high-contrast token mappings in `src/index.css` and `src/main.tsx`
- [X] T009 [P] Add reusable seigaiha-pattern section styling, centered content rail, responsive page gutters, and no-overflow rules in `src/App.css`
- [X] T010 [P] Add shared responsive header, footer, panel, focus, and reduced-motion states in `src/App.css`

**Checkpoint**: Shared routing, assets, typography, theme tokens, and responsive primitives are ready; user stories can proceed independently.

---

## Phase 3: User Story 1 - Learn Who Made Renmeshi (Priority: P1) 🎯 MVP

**Goal**: Deliver a reachable About Us page that communicates the Vale and Danno story with the portrait, responsive layout, patterned statement, shared navigation, and footer.

**Independent Test**: Open `#/about` at 1440 px and 320 px, verify the desktop image-left/story-right grid and mobile image-above/story stack, confirm all story content and closing sections are readable, then toggle the theme and keyboard through every interactive control.

### Implementation for User Story 1

- [X] T011 [P] [US1] Add the About Us page content object, creator names, story paragraphs, statement copy, footer message, portrait alternative text, and `src/assets/creator-portrait.jpg` reference in `src/models/about-us.ts`
- [X] T012 [US1] Render the About Us semantic main region with one primary heading, portrait frame, ordered story paragraphs, statement band, and shared footer in `src/App.tsx`
- [X] T013 [US1] Implement the desktop About Us two-column Grid with portrait-left/story-right placement, centered rail, stable `aspect-ratio`, rounded overflow frame, and `object-fit: cover` in `src/App.css`
- [X] T014 [US1] Implement the About Us 800 px grid-to-stack transition and 520 px compact spacing rules in `src/App.css`
- [X] T015 [US1] Add About Us active navigation state, semantic labels, portrait alternative text, visible focus states, and keyboard-safe mobile menu behavior in `src/App.tsx` and `src/App.css`
- [X] T016 [US1] Run the About Us responsive and theme validation from `specs/002-about-us-category-showcase/quickstart.md` against `src/App.tsx` at 1440 px, 800 px, 520 px, 375 px, and 320 px

**Checkpoint**: User Story 1 is independently usable and demonstrates the MVP About Us experience.

---

## Phase 4: User Story 2 - Explore Recipe Categories from Home (Priority: P1)

**Goal**: Add the four supplied pixel-art category links and connect each one to the existing filtered recipe collection.

**Independent Test**: Open `#/` at desktop and mobile widths, verify the exact order and art, activate each category, confirm the matching plural filter is selected, and verify labels remain usable when an image fails.

### Implementation for User Story 2

- [X] T017 [P] [US2] Define the four `RecipeCategoryLink` records with singular labels, existing plural category values, exact image paths, alt text, and sort order in `src/models/about-us.ts`
- [X] T018 [US2] Implement the four-item category panel with keyboard-focusable links, resilient labels, image loading behavior, and matching hash/filter destinations in `src/App.tsx`
- [X] T019 [US2] Implement desktop four-track category Grid, stable pixel-art image regions, nearest-neighbor rendering, panel framing, hover/focus states, and seigaiha background in `src/App.css`
- [X] T020 [US2] Implement the 800 px two-track fallback and 520 px one-column ordered category stack with consistent vertical spacing in `src/App.css`
- [X] T021 [US2] Preserve existing free-text, time, and category filtering while applying category-link destinations in `src/App.tsx` and `src/lib/recipe-filtering.ts`
- [X] T022 [US2] Run the category interaction, missing-image fallback, keyboard focus, theme, and responsive validation from `specs/002-about-us-category-showcase/quickstart.md` against `src/App.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently; category links provide direct recipe discovery without replacing existing filters.

---

## Phase 5: User Story 3 - Understand the Renmeshi Homepage Story (Priority: P2)

**Goal**: Recompose the homepage into the screenshot-inspired editorial sequence: latest recipes, Renmeshi explanation, categories, and footer.

**Independent Test**: Open `#/` at 1440 px and 320 px, verify all required sections appear in order with the intended hierarchy, recipe discovery still works, and no horizontal overflow or overlapping content appears in either theme.

### Implementation for User Story 3

- [X] T023 [US3] Compose the homepage section order with latest-recipes showcase, Renmeshi explanation, category showcase, and shared footer in `src/App.tsx`
- [X] T024 [US3] Add the Pixelpori hero heading, latest-recipes panel, recipe-card presentation, and view-all-recipes action without removing existing search/filter controls in `src/App.tsx`
- [X] T025 [US3] Implement the desktop latest-recipes Grid with three recipe-card tracks and a view-all action track, plus Flexbox card internals, in `src/App.css`
- [X] T026 [US3] Implement the Renmeshi explanation band with centered heading, constrained readable copy measure, and responsive spacing in `src/App.css`
- [X] T027 [US3] Implement homepage desktop and mobile section spacing, pattern bands, panel hierarchy, and full-width teal semantic footer treatment in `src/App.css`
- [X] T028 [US3] Verify homepage section semantics, heading hierarchy, responsive order, accessible action names, and existing recipe/detail navigation in `src/App.tsx`
- [X] T029 [US3] Run the full homepage visual, route, theme, focus, image, and no-overflow validation from `specs/002-about-us-category-showcase/quickstart.md` against `src/App.tsx` at 1440 px, 1024 px, 800 px, 520 px, 375 px, and 320 px

**Checkpoint**: All three user stories are independently testable and the complete homepage/About Us flow matches the documented design strategy.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify the complete feature against the constitution, plan, contracts, and quickstart.

- [X] T030 [P] Audit `src/App.tsx`, `src/App.css`, `src/index.css`, and `src/main.tsx` for hard-coded component colors, missing theme variants, and font-role deviations from `specs/002-about-us-category-showcase/plan.md`
- [X] T031 [P] Audit all public images and interactive elements in `src/App.tsx` for alt text, accessible names, visible focus, semantic headings, and keyboard reachability
- [X] T032 [P] Check rendered public layouts for horizontal overflow and clipped text at 320 px and browser zoom using the validation cases in `specs/002-about-us-category-showcase/quickstart.md`
- [X] T033 Run `npm run lint` and resolve feature-related diagnostics in `src/App.tsx`, `src/App.css`, `src/index.css`, `src/main.tsx`, and `src/models/about-us.ts`
- [X] T034 Run `npm run build` and resolve feature-related TypeScript or Vite errors in `src/App.tsx` and the other changed source files
- [X] T035 Run the complete validation in `specs/002-about-us-category-showcase/quickstart.md` against `src/App.tsx` and record any residual limitations in `specs/002-about-us-category-showcase/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; confirms the existing surface and required asset inputs.
- **Foundational (Phase 2)**: Depends on Setup and blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational; no dependency on User Story 2 or 3.
- **User Story 2 (Phase 4)**: Depends on Foundational and the existing recipe filtering contract; can proceed in parallel with User Story 1 after Foundation.
- **User Story 3 (Phase 5)**: Depends on Foundational and integrates the completed category showcase; it can begin after the category component contract is established, with final composition after User Story 2.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Foundational only. This is the suggested MVP.
- **US2 (P1)**: Foundational plus existing `RecipeCategory` and `filterRecipes` behavior. Independent from US1.
- **US3 (P2)**: Foundational plus the US2 category panel when composing the final homepage; latest-recipes and explanation work can proceed in parallel with US1/US2.

### Within Each User Story

- Content/data definitions precede JSX integration.
- JSX structure precedes story-specific CSS and responsive rules.
- Interaction/accessibility integration follows the structural implementation.
- Each story's quickstart validation runs at its checkpoint before moving to the next story.

## Parallel Execution Examples

### Foundation

```text
Task T009: Add seigaiha pattern and responsive content-rail CSS in src/App.css
Task T010: Add shared header/footer/panel/focus states in src/App.css
```

### User Story 1

```text
Task T011: Define About Us content and portrait metadata in src/models/about-us.ts
Task T013: Implement desktop About Us Grid and portrait frame in src/App.css
```

### User Story 2

```text
Task T017: Define RecipeCategoryLink records in src/models/about-us.ts
Task T019: Implement desktop category Grid and pixel-art states in src/App.css
```

### User Story 3

```text
Task T024: Compose homepage hero/latest content in src/App.tsx
Task T026: Implement explanation-band layout in src/App.css
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 Setup.
2. Complete Phase 2 Foundational work.
3. Complete Phase 3 User Story 1.
4. Stop and validate `#/about` independently at desktop/mobile widths and both themes.
5. Review the About Us implementation before adding automated tests or proceeding to later story work.

### Incremental Delivery

1. Complete Setup and Foundation.
2. Deliver US1 About Us and validate independently.
3. Deliver US2 category navigation and validate category filtering independently.
4. Deliver US3 homepage composition and validate the complete editorial flow.
5. Run Phase 6 lint, build, accessibility, responsive, and quickstart checks.

### Parallel Team Strategy

After Foundation completes, one developer can implement US1 content/route work while another implements US2 category data/navigation. US3 latest-recipes and explanation styling can proceed in parallel, then integrate the category section after its contract is stable.

## Notes

- Every task uses the required checkbox, sequential ID, optional `[P]` marker, story label where applicable, and exact repository file path.
- No new backend, account, social, meal-planning, or third-party import work is included.
- The approved `src/assets/creator-portrait.jpg` is now present and is treated as a required input, not a placeholder.
