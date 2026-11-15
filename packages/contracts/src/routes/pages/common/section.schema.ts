import { Type, type Static } from "@sinclair/typebox";

export const SectionLayoutTypeSchema = Type.Union([
  Type.Literal("full"),
  Type.Literal("two-column"),
  Type.Literal("three-column"),
]);

export type SectionLayoutType = Static<typeof SectionLayoutTypeSchema>;

export const SectionThemeTypeSchema = Type.Union([
  Type.Literal("none"),
  Type.Literal("light"),
  Type.Literal("brand"),
]);

export type SectionThemeType = Static<typeof SectionThemeTypeSchema>;

export const SectionSchema = Type.Object({
  headerLabel: Type.Optional(Type.String()),
  layout: SectionLayoutTypeSchema,
  themeType: SectionThemeTypeSchema,
});

export type Section = Static<typeof SectionSchema>;
