# rugby-au
This project showcases a demo of a website builder

Both apps map `@/*` to their own `src/*` directory. The UI resolves these
imports through Next.js. Run the API with `pnpm --filter api dev` and use
extensionless API imports such as `@/services/example`. The API build rewrites
aliases into relative ESM imports for Node.js.

See [the API README](apps/api/README.md) for testing, linting, formatting, and
TypeScript configuration details.

## Git hooks

Run `pnpm install` from the repository root to install dependencies and activate
Husky through the `prepare` script. If dependencies are already installed, run
`pnpm prepare` to activate the hooks.

The pre-commit hook runs both lint scripts, then both test scripts explicitly:

```bash
pnpm --filter api lint
pnpm --filter ui lint
pnpm --filter api test
pnpm --filter ui test
```

A failed lint or test command blocks the commit. Run `pnpm test` to run both test
suites manually. Run `pnpm check` for the full checks in both projects:

- API: type checking, ESLint, Prettier checks, Vitest tests, and a production build.
- UI: type checking, ESLint, Vitest component tests, and a production build.

The full check command checks both projects even if one fails.
Checks do not automatically format or stage files; use
`pnpm --filter api format` or `pnpm --filter api lint:fix` to apply fixes.

In CI, set `HUSKY=0` when installing dependencies to skip hook installation.
