import { Type, type Static } from "@sinclair/typebox";
import { SiteThemeStyleSchema } from "@/common/site-theme.schema.js";

export const CardVariantSchema = Type.Union([
  Type.Literal("image"),
  Type.Literal("icon"),
]);

export type CardVariant = Static<typeof CardVariantSchema>;

export const CardImageSchema = Type.Object({
  url: Type.String(),
  alt: Type.String(),
});

export type CardImage = Static<typeof CardImageSchema>;

export const CardLinkSchema = Type.Object({
  label: Type.String(),
  href: Type.String(),
});

export type CardLink = Static<typeof CardLinkSchema>;

export const CardSchema = Type.Object({
  id: Type.String(),
  variant: CardVariantSchema,
  styleVariant: Type.Optional(SiteThemeStyleSchema),
  date: Type.Optional(Type.String()),
  heading: Type.String(),
  subHeading: Type.Optional(Type.String()),
  link: Type.Optional(CardLinkSchema),
  image: Type.Optional(CardImageSchema),
  icon: Type.Optional(Type.String()),
  backgroundColor: Type.Optional(Type.String()),
});

export type Card = Static<typeof CardSchema>;

export const CardGridSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  cards: Type.Array(CardSchema),
});
