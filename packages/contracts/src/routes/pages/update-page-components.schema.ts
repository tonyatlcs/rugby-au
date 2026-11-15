import { ComponentNodeSchema } from "@/common/index.js";
import { Type, type Static } from "@sinclair/typebox";
export const UpdatePageComponentsParamSchema = Type.Object({
  pageId: Type.String(),
});

export type UpdatePageComponentsParam = Static<
  typeof UpdatePageComponentsParamSchema
>;

export const UpdatePageComponentsRequestSchema = Type.Object({
  components: Type.Array(ComponentNodeSchema),
});

export type UpdatePageComponentsRequest = Static<
  typeof UpdatePageComponentsRequestSchema
>;

export const UpdatePageComponentsResponseSchema = Type.Object({
  message: Type.String(),
});

export type UpdatePageComponentsResponse = Static<
  typeof UpdatePageComponentsResponseSchema
>;
