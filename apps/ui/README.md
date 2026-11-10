# Rugby AU UI

Next.js frontend using TypeScript and SCSS Modules.

Start the development server from the repository root:

```bash
pnpm ui:dev
```

Open http://localhost:3000. Edit `app/page.tsx` to build the homepage.

## Styling

Use `*.module.scss` for page and component styles, then import them as a
`styles` object.
Use `@/` to import from `src/`, for example `import "@/styles/globals.scss"`.
Keep shared resets and document defaults in `src/styles/globals.scss`, imported
once by the root layout.
The reset lives in `src/styles/_reset.scss` and is loaded by `globals.scss` using
Sass `@use`.

## Checks

Run these commands from the repository root:

```bash
pnpm --filter ui check
```

This generates Next.js route types, checks TypeScript, runs ESLint and Vitest,
and creates a production build. The workspace pre-commit hook runs the UI and
API lint and test scripts. Use `pnpm check` to check both apps or `pnpm test` to
run both test suites.

Run `pnpm --filter ui test:watch` for Vitest watch mode. Tests use React Testing
Library with jsdom and resolve `@/` imports through the UI TypeScript config.
Name component tests `*.test.tsx` or `*.spec.tsx`; they can live alongside the
components they test.
