import { PageSchema } from "@/common/page.schema.js";
import { Type, type Static } from "@sinclair/typebox";

export const CreatePageRequestSchema = Type.Object({
  siteId: Type.String(),
  title: Type.String(),
  path: Type.String(),
  parentId: Type.Optional(Type.String()),
  order: Type.Optional(Type.Number({ minimum: 0 })),
});

export type CreatePageRequest = Static<typeof CreatePageRequestSchema>;

export const CreatePageResponseSchema = Type.Object({
  message: Type.String(),
});

export type CreatePageResponse = Static<typeof CreatePageResponseSchema>;
