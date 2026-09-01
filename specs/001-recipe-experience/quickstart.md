# Quickstart Validation: Core Renmeshi Recipe Experience

## Prerequisites

- Node.js compatible with the repository’s TypeScript and Vite toolchain.
- Dependencies installed with `npm install`.
- A configured development datastore and admin credential for the server-backed Backstage flows.
- Implementation code reviewed and approved before adding or executing automated tests, per the project constitution.

## Start the application

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in a modern browser.

## Manual acceptance pass

1. On the public collection, verify all recipes are visible. Apply a category, time band,
   and keyword together; confirm results update immediately and the no-match state is useful.
2. Open a recipe. Change servings, verify numeric quantities scale proportionally, check and
   uncheck ingredients, and navigate within the recipe to confirm checks remain isolated to it.
3. Switch light/dark theme from public and Backstage screens. Reload and navigate between
   screens; confirm the selected theme is present before content appears and all states remain
   legible.
4. Request Backstage while signed out and confirm redirection to sign-in. Sign in as an admin,
   create and edit a valid recipe, verify the public catalog reflects each change, and confirm
   each successful action has an actor and timestamp in history. Sign out and repeat the access
   attempt.
5. Submit invalid recipe data and attempt mutations with an expired or invalid session; confirm
   the catalog remains unchanged and the user receives actionable feedback.

## Automated validation to add after implementation approval

Run the repository’s configured checks once the implementation and test dependencies exist:

```bash
npm run lint
npm run build
npm test
```

The automated suite must include:

- Unit coverage for category, time-band, whitespace/case-insensitive keyword matching, and combined filtering.
- Unit coverage for proportional serving scaling, invalid serving values, and non-scalable ingredient text.
- Integration coverage proving signed-out or expired sessions cannot read protected Backstage data or mutate recipes, and successful mutations create history only after persistence succeeds.
- Browser coverage for theme persistence/no-flash behavior, responsive public and Backstage flows, focus states, and signed-out redirect behavior.

Refer to [data-model.md](./data-model.md) for field and transition rules and [contracts/ui-and-server.md](./contracts/ui-and-server.md) for the user-facing and server boundary contracts.