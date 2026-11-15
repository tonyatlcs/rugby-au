import { PageSchema } from "@/common/page.schema.js";
import { Type, type Static } from "@sinclair/typebox";

export const RetrievePageParamSchema = Type.Object({
  pageId: Type.String(),
});

export type RetrievePageParam = Static<typeof RetrievePageParamSchema>;

export const RetrievePageByPathParamSchema = Type.Object({
  siteKey: Type.String({ minLength: 1 }),
});

export type RetrievePageByPathParam = Static<
  typeof RetrievePageByPathParamSchema
>;

export const RetrievePageByPathQuerySchema = Type.Object({
  path: Type.String({ pattern: "^/" }),
});

export type RetrievePageByPathQuery = Static<
  typeof RetrievePageByPathQuerySchema
>;

export const RetrievePageResponseSchema = PageSchema;

export type RetrievePageResponse = Static<typeof RetrievePageResponseSchema>;
