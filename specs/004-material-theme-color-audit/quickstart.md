# Quickstart: Material Theme Color Audit

## Prerequisites

- Node.js and npm are installed.
- Dependencies are installed with `npm install`.
- Run commands from the repository root.
- The approved Material Theme Builder export and four mode mappings are available to reviewers.

## Static Validation

```sh
npm run lint
npm run build
npm test
```

Expected outcome: lint, production build, and unit tests pass. Validation identifies hard-coded
or custom colors, prohibited derived treatments, missing mode coverage, and undocumented
exceptions.

## Browser Validation

```sh
npm run test:browser
```

Expected outcomes:

1. Public and admin primary journeys remain usable in light, dark, medium-contrast, and
   high-contrast modes.
2. Text, controls, focus indicators, state treatments, and canonical assets remain legible.
3. No coral, violet, gold, lime, or other ad hoc color variant appears.
4. No tested surface introduces horizontal overflow, clipping, or a flash of an unrelated
   palette during mode changes.

## Controlled Regression Check

Introduce a temporary unapproved color or derived effect in a local change, run the static and
browser validation, and confirm the change is identified before release. Remove the temporary
change after the check.

## References

- Requirements and acceptance scenarios: [spec.md](spec.md)
- Design decisions: [research.md](research.md)
- Visual entities and invariants: [data-model.md](data-model.md)
- User-visible contract: [contracts/ui-color-contract.md](contracts/ui-color-contract.md)
