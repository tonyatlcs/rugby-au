import { SiteStatusSchema } from "@rugby-au/contracts";
import { Static, Type } from "@sinclair/typebox";

export const SiteInformationSchema = Type.Object({
  id: Type.String(),
  siteName: Type.String(),
  pageCount: Type.Number({ minimum: 0 }),
  status: SiteStatusSchema,
  url: Type.Optional(Type.String()),
});

export type SiteInformation = Static<typeof SiteInformationSchema>;
