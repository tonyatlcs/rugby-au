import {
  CardGridSchema,
  CardSchema,
} from "@/routes/pages/common/card.schema.js";
import { SectionSchema } from "@/routes/pages/common/section.schema.js";
import { type Static, Type } from "@sinclair/typebox";

export const ComponentNodeSchema = Type.Recursive((Component) =>
  Type.Union([
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      type: Type.Literal("section"),
      props: SectionSchema,
      children: Type.Array(Component),
    }),

    Type.Object({
      id: Type.String(),
      type: Type.Literal("card-grid"),
      name: Type.String(),
      props: CardGridSchema,
      children: Type.Array(CardSchema),
    }),
  ]),
);

export type ComponentNode = Static<typeof ComponentNodeSchema>;
export type SectionComponent = Extract<ComponentNode, { type: "section" }>;
export type CardGridComponent = Extract<ComponentNode, { type: "card-grid" }>;
