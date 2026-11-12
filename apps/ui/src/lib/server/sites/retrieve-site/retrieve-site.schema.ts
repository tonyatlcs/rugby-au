import { SiteStatusSchema } from "@rugby-au/contracts";
import { Type, type Static } from "@sinclair/typebox";

export const SiteParamSchema = Type.Object({
  siteId: Type.String(),
});

export type SiteParam = Static<typeof SiteParamSchema>;

export const SiteInformationSchema = Type.Object({
  id: Type.String(),
  siteName: Type.String(),
  pageCount: Type.Number({ minimum: 0 }),
  status: SiteStatusSchema,
  url: Type.Optional(Type.String()),
});

export type SiteInformation = Static<typeof SiteInformationSchema>;

export const PageInformationSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  path: Type.String(),
  parentId: Type.Union([Type.String(), Type.Null()]),
  order: Type.Integer({ minimum: 0 }),
});

export type PageInformation = Static<typeof PageInformationSchema>;

export const SiteResponseSchema = Type.Object({
  siteInformation: SiteInformationSchema,
  pageInformation: Type.Array(PageInformationSchema),
});

export type SiteResponse = Static<typeof SiteResponseSchema>;
