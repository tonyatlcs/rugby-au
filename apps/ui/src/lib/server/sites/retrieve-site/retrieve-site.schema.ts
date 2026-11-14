import { PageInformationSchema } from "@/lib/server/schemas/page.schema";
import { SiteInformationSchema } from "@/lib/server/schemas/site.schema";
import { Type, type Static } from "@sinclair/typebox";

export const SiteParamSchema = Type.Object({
  siteId: Type.String(),
});

export type SiteParam = Static<typeof SiteParamSchema>;

export const SiteResponseSchema = Type.Object({
  siteInformation: SiteInformationSchema,
  pageInformation: Type.Array(PageInformationSchema),
});

export type SiteResponse = Static<typeof SiteResponseSchema>;
