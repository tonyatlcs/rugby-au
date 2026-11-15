import { ComponentNodeSchema } from "@rugby-au/contracts";
import { Type, type Static } from "@sinclair/typebox";

export const PageParamsSchema = Type.Object({
  pageId: Type.String(),
});

export type PageParams = Static<typeof PageParamsSchema>;

export const PageSummarySchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  siteName: Type.String(),
  path: Type.String(),
});

export type PageSummary = Static<typeof PageSummarySchema>;

export const PageResponseSchema = Type.Object({
  summary: PageSummarySchema,
  componentTree: Type.Array(ComponentNodeSchema),
});

export type PageResponse = Static<typeof PageResponseSchema>;
