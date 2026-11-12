import { Type, type Static } from "@sinclair/typebox";

export const ComponentTypeSchema = Type.Union([
  Type.Literal("section"),
  Type.Literal("card-grid"),
]);

export type ComponentType = Static<typeof ComponentTypeSchema>;

export const ComponentNodeSchema = Type.Recursive((Self) =>
  Type.Object({
    id: Type.String(),
    type: ComponentTypeSchema,
    props: Type.Record(Type.String(), Type.Unknown()),
    children: Type.Array(Self),
  }),
);

export type ComponentNode = Static<typeof ComponentNodeSchema>;

export const PageSchema = Type.Object({
  id: Type.String(),
  siteId: Type.String(),
  title: Type.String(),
  path: Type.String(),
  parentId: Type.String(),
  order: Type.Number({ minimum: 0 }),
  componentNode: ComponentNodeSchema,
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type Page = Static<typeof PageSchema>;
