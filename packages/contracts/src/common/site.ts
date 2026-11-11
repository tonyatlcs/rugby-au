import { Type, type Static } from "@sinclair/typebox";
import { SiteThemeSchema } from "./site-theme.js";

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
});

export type Site = Static<typeof SiteSchema>;
