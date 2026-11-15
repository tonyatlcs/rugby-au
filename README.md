# Rugby AU website builder

A demo website builder for two sites: Rugby AU and Wallabies. The repository contains:

- `apps/ui` — the Next.js editor and site pages.
- `apps/api` — the Fastify API and MongoDB models and migrations.
- `packages/contracts` — shared page, site and API schemas.
- `apps/api/migrations/20261110092951-seed-default-site.ts` — the initial site seed.

The migrations seed both sites and a home page with a section and card grid for each. Existing sites and home pages are left unchanged. The page seed is in `apps/api/migrations/20261116000002-seed-example-pages.ts`.

## Run locally

You need Node.js, pnpm 10.28.0 and a running MongoDB instance. Run these commands from the repository root:

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
```

If you don't have MongoDB installed, on macOS you can install and start MongoDB
Community Edition using [Homebrew](https://brew.sh/):

```bash
brew tap mongodb/brew
brew install mongodb-community@8.0
brew services start mongodb-community@8.0
```

Check the service with `brew services list` and stop it when needed with
`brew services stop mongodb-community@8.0`. The example URI connects to the
local instance and uses the `rugby_au_dev` database, which MongoDB creates when
data is first written. For other operating systems, follow MongoDB's installation
instructions for [Linux](https://www.mongodb.com/docs/manual/administration/install-community-linux/)
or [Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/).

Set `MONGODB_URI` in `apps/api/.env` if your MongoDB address differs from the example. Then create the collections and seed the sites:

```bash
pnpm --filter api migrate:up
```

Create `apps/ui/.env.local` with:

```env
BACKEND_URL=http://localhost:3001
```

Start the API and UI in separate terminals:

```bash
pnpm api:dev
```

```bash
pnpm ui:dev
```

Open [http://localhost:3000](http://localhost:3000), select a site, and open its home page. The API runs on port 3001 by default. Run `pnpm check` to type-check, lint and build both apps. See the [API README](apps/api/README.md) for migration and development details.

## Page JSON

A page is stored in MongoDB's `pages` collection. It has a site ID, a title and path, an optional parent page, an order, and a tree of components. Paths start with `/`; `parentId: null` means a top-level page. Each component has an `_id`, `type`, `name`, `props` and `children`. Sections can contain other sections or card grids; a card grid keeps its cards in `props.cards`.

For example, this is a page document (timestamps are MongoDB dates, shown here as strings for readability):

```json
{
  "_id": "page-1",
  "siteId": "site-1",
  "title": "Home",
  "path": "/",
  "parentId": null,
  "order": 0,
  "components": [
    {
      "_id": "section-1",
      "name": "Welcome",
      "type": "section",
      "props": { "headerLabel": "Welcome", "layout": "full", "themeType": "none" },
      "children": [
        {
          "_id": "section-2",
          "name": "Latest updates",
          "type": "section",
          "props": { "headerLabel": "Latest updates", "layout": "full", "themeType": "none" },
          "children": [
            {
              "_id": "grid-1",
              "name": "News",
              "type": "card-grid",
              "props": {
                "id": "grid-1",
                "title": "News",
                "cards": [
                  { "id": "card-1", "variant": "icon", "heading": "Latest news" }
                ]
              },
              "children": []
            }
          ]
        }
      ]
    }
  ],
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

Use a real site `_id` for `siteId`. The API represents component `_id` as `id`, returns the full site in place of `siteId`, and represents a missing parent as an empty string. The supported component shapes are defined in [`component-node.schema.ts`](packages/contracts/src/routes/pages/common/component-node.schema.ts), with section and card properties in the adjacent schema files.

## Rendering the component tree

The page's `components` array describes what appears on the page and in what order. The UI loads this array from the API, and [`ComponentTree`](apps/ui/src/features/page/components/ComponentTree/ComponentTree.tsx) turns it into React components:

1. Start with each component at the top of the array.
2. For a section, render a `Section`, then repeat these steps for each component in its `children`. This also handles sections inside sections.
3. For a card grid, render its title and each card in `props.cards` as a `ContentCard`. Cards use the site's style.

In the editor, [`PageEditorProvider`](apps/ui/src/providers/PageEditor/PageEditorProvider.tsx) holds the current tree as you make changes. The editor also adds selection outlines and placeholders for empty spaces. When you save, it sends the updated tree to the API.

## Adding a new component

1. Define its properties and add its type to the shared schemas in `packages/contracts/src/routes/pages/common/` and `packages/contracts/src/common/page.schema.ts`.
2. Add its stored shape in `apps/api/src/models/page.model.ts`, and update the conversions in `apps/api/src/services/page.service.ts` and `apps/api/src/dto/transform-retrieve-page-response.dto.ts` so it can be saved and read.
3. Create its React component in `apps/ui/src/components/elements/` and render it in `apps/ui/src/features/page/components/ComponentTree/ComponentTree.tsx`.
4. Register the component in the editor, supply its defaults, and pass its props schema to `ComponentPropsEditor`. The shared form renders strings, string literal unions, objects, optional fields and arrays from the schema, so these props do not need a new hand-written form. Use schema `title` and `default` options for labels and initial values. Pass optional form configuration for editor-only behaviour such as hidden identifiers, generated IDs, list labels and visual choice controls. Extend `ComponentPropsEditor` when a new schema shape needs a new control. Update tree utilities where the new type needs different nesting or editing behavior.
5. Run `pnpm check`, then add and edit the component in the UI to verify it saves and reloads.

During development, run `pnpm --filter @rugby-au/contracts dev` in another terminal to rebuild shared contracts when they change; restart an app if it does not pick up the changes.

## Decisions and trade-offs

- **Separate Fastify backend:** Multiple systems may need the same site and page data. A separate API gives them a common way to access it without tying data access to the Next.js client. This makes frontend and backend requirements easier to change independently, but adds a service to run and maintain.
  
- **Shared contracts:** The UI and API use the same schemas and TypeScript types, reducing duplication. The editor generates prop fields from the schemas using a small supported JSON Schema subset. A new field using an unsupported shape requires extending the shared form renderer. Changes to the contracts require rebuilding the shared package and may require updates in both apps.

- **Component trees in MongoDB:** Pages store nested sections and card grids as data, so their layout and content can be edited. Adding a new component type requires changes across the schema, API and editor.

- **Separate sites, shared builder:** Each site has its own pages and theme while using the same editor and components. This keeps the demo small, but limits site-specific behavior to what the shared builder supports.

- **Migration-based seed data:** A fresh database gets two sites and example home pages. Existing home pages are preserved; the seed does not refresh their content on later runs.
- 

## Time and AI tools

- **Time spent:** One working day (roughly 8 hours).
- **AI tools:** OpenAI Codex was used to help with implementation and documentation.
