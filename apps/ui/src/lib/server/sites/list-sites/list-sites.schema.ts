import { Type, type Static } from "@sinclair/typebox";
import { SiteStatusSchema } from "@rugby-au/contracts";

export const SiteListItemSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  url: Type.String(),
  pageCount: Type.Number({ minimum: 0 }),
  logo: Type.Optional(Type.String()),
  status: SiteStatusSchema,
  themeColor: Type.String(),
});

export type SiteListItem = Static<typeof SiteListItemSchema>;

export const SiteListResponseSchema = Type.Array(SiteListItemSchema);

export type SiteListResponse = Static<typeof SiteListResponseSchema>;
