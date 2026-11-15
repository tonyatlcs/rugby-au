import { Type, type Static } from "@sinclair/typebox";

export const SectionLayoutTypeSchema = Type.Union(
  [
    Type.Literal("full", { title: "Full width" }),
    Type.Literal("two-column", { title: "Two columns" }),
    Type.Literal("three-column", {
      title: "Three columns",
    }),
  ],
  { title: "Layout" },
);

export type SectionLayoutType = Static<typeof SectionLayoutTypeSchema>;

export const SectionThemeTypeSchema = Type.Union(
  [
    Type.Literal("none", {
      title: "None",
    }),
    Type.Literal("light", {
      title: "Light",
    }),
    Type.Literal("brand", {
      title: "Brand",
    }),
  ],
  {
    title: "Background",
    description: "Colours follow the website’s theme.",
  },
);

export type SectionThemeType = Static<typeof SectionThemeTypeSchema>;

export const SectionSchema = Type.Object({
  headerLabel: Type.Optional(Type.String({ title: "Section title" })),
  layout: SectionLayoutTypeSchema,
  themeType: SectionThemeTypeSchema,
});

export type Section = Static<typeof SectionSchema>;
