# Rugby AU API

Run commands from the repository root with `pnpm --filter api <script>`.

The development script pipes API logs through `pino-pretty` for readable, colored
output. Production logs from `pnpm --filter api start` remain JSON.

The API loads `apps/api/.env` at startup through `dotenv` when run with the
workspace scripts. Access values with `process.env`; existing environment
variables take precedence. The `.env` file is ignored by Git.

| Script         | Purpose                                                                       |
| -------------- | ----------------------------------------------------------------------------- |
| `dev`          | Run the API on port 3001 and restart when source files change.                |
| `build`        | Compile production files into `dist/` and rewrite aliases for Node.js ESM.    |
| `start`        | Run the compiled API after building.                                          |
| `typecheck`    | Check source files, tests, and TypeScript configuration files.                |
| `test`         | Run Vitest once.                                                              |
| `test:watch`   | Run Vitest in watch mode.                                                     |
| `lint`         | Check files with type-aware ESLint rules.                                     |
| `lint:fix`     | Apply available ESLint fixes.                                                 |
| `format`       | Format API files with Prettier.                                               |
| `format:check` | Check formatting without changing files.                                      |
| `check`        | Run type checking, linting, formatting checks, tests, and a production build. |

## TypeScript configurations

- `tsconfig.json` contains shared compiler options and editor settings.
- `tsconfig.build.json` extends the base and emits production source files only.
  It excludes `.test.*`, `.spec.*`, and `test`, `tests`, `__tests__`, and `__mocks__`
  directories. Keep test imports out of production modules: TypeScript follows
  imports even when their targets match an exclusion.
- `tsconfig.eslint.json` extends the base and includes all `.ts` and `.tsx` files,
  including tests and configuration files, for type checking and ESLint.

Generated output, dependencies, and coverage reports are excluded from checks.

## Imports and tests

Use extensionless `@/` imports to reference `src/`, such as `@/app`.
The alias works in `tsx`, Vitest, and production builds. The build uses
`tsc-alias` to turn aliases into relative imports with `.js` extensions.

Name tests `*.test.ts`, `*.spec.ts`, `*.test.tsx`, or `*.spec.tsx` and import test
helpers explicitly from `vitest`. The health-route test uses Fastify's `inject`
method to exercise the application without opening a network port.
