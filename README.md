# rugby-au
This project showcases a demo of a website builder

Both apps map `@/*` to their own `src/*` directory. The UI resolves these
imports through Next.js. Run the API with `pnpm --filter api dev` and use
extensionless API imports such as `@/services/example`. The API build rewrites
aliases into relative ESM imports for Node.js.

See [the API README](apps/api/README.md) for testing, linting, formatting, and
TypeScript configuration details.

## Shared API contracts

`packages/contracts` is the `@rugby-au/contracts` workspace package. It owns the
public TypeBox response schemas and derives TypeScript types from those schemas.
Both apps depend on it through `workspace:*`; database models stay in the API.

Reusable schemas live in `src/common/` (for example, `site.ts` and
`site-theme.ts`). Each route has its own contract file in `src/routes/`
(for example, `list-sites.ts` and `health.ts`). `src/index.ts` exports the public
schemas and types so both apps can import from the package root.

```ts
import { ListSitesResponseSchema } from "@rugby-au/contracts";
import type { ListSitesResponse, Site } from "@rugby-au/contracts";
```

App dev, build, typecheck, and test commands build the contracts first. When
editing contracts during an active dev session, run
`pnpm --filter @rugby-au/contracts dev` in another terminal to watch for changes;
restart an app if its dev server does not pick up the rebuilt package.
Type annotations alone do not validate JSON received over HTTP.

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
