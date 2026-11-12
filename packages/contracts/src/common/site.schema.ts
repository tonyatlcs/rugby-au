import { Type, type Static } from "@sinclair/typebox";
import { SiteThemeSchema } from "./site-theme.schema.js";

export const SiteStatusSchema = Type.Union([
  Type.Literal("draft"),
  Type.Literal("published"),
]);

export type SiteStatus = Static<typeof SiteStatusSchema>;

export const SiteSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.Optional(Type.String()),
  siteKey: Type.String(),
  status: SiteStatusSchema,
  theme: SiteThemeSchema,
  pageCount: Type.Number({ minimum: 0 }),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type Site = Static<typeof SiteSchema>;
