import { SiteSchema } from "@/common/site.schema.js";
import { ComponentNodeSchema } from "@/routes/pages/common/component-node.schema.js";
import { Type, type Static } from "@sinclair/typebox";

export const ComponentTypeSchema = Type.Union([
  Type.Literal("section"),
  Type.Literal("card-grid"),
]);

export type ComponentType = Static<typeof ComponentTypeSchema>;

export const PageSchema = Type.Object({
  id: Type.String(),
  site: SiteSchema,
  title: Type.String(),
  path: Type.String(),
  parentId: Type.String(),
  order: Type.Number({ minimum: 0 }),
  components: Type.Optional(Type.Array(ComponentNodeSchema)),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type Page = Static<typeof PageSchema>;
