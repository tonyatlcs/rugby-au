import { PageSchema } from "@/common/page.schema.js";
import { Type, type Static } from "@sinclair/typebox";

export const RetrievePageParamSchema = Type.Object({
  pageId: Type.String(),
});

export type RetrievePageParam = Static<typeof RetrievePageParamSchema>;

export const RetrievePageResponseSchema = PageSchema;

export type RetrievePageResponse = Static<typeof RetrievePageResponseSchema>;
