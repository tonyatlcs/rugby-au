import { Type, type Static } from "@sinclair/typebox";
import { SiteSchema } from "../../common/site.js";

export const ListSitesItemSchema = Type.Object({
  ...SiteSchema.properties,
  pageCount: Type.Integer({ minimum: 0 }),
});

export type ListSitesItem = Static<typeof ListSitesItemSchema>;

export const ListSitesResponseSchema = Type.Array(ListSitesItemSchema);

export type ListSitesResponse = Static<typeof ListSitesResponseSchema>;
