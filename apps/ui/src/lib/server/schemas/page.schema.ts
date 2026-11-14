import { Static, Type } from "@sinclair/typebox";

export const PageInformationSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  path: Type.String(),
  parentId: Type.String(),
  order: Type.Integer({ minimum: 0 }),
});

export type PageInformation = Static<typeof PageInformationSchema>;

export const PageTreeNodeSchema = Type.Recursive((Self) =>
  Type.Object({
    name: Type.String(),
    attributes: PageInformationSchema,
    children: Type.Array(Self),
  }),
);

export const PageTreeSchema = Type.Array(PageTreeNodeSchema);

export type PageTreeNode = Static<typeof PageTreeNodeSchema>;
export type PageTree = Static<typeof PageTreeSchema>;
