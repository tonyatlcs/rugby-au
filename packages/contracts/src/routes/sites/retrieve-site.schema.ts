import { Type, type Static } from "@sinclair/typebox";
import { PageSchema, SiteSchema } from "../../common/index.js";

export const RetrieveSiteParamSchema = Type.Object({
  siteId: Type.String(),
});

export type RetrieveSiteParam = Static<typeof RetrieveSiteParamSchema>;

export const RetrieveSiteResponseSchema = Type.Object({
  siteInfo: SiteSchema,
  pageInfo: Type.Array(PageSchema),
});

export type RetrieveSiteResponse = Static<typeof RetrieveSiteResponseSchema>;
