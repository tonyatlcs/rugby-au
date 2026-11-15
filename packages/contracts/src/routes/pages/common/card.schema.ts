import { Type, type Static } from "@sinclair/typebox";
import { SiteThemeStyleSchema } from "@/common/site-theme.schema.js";

export const CardVariantSchema = Type.Union(
  [Type.Literal("image"), Type.Literal("icon")],
  { title: "Variant", default: "image" },
);

export type CardVariant = Static<typeof CardVariantSchema>;

export const CardImageSchema = Type.Object(
  {
    url: Type.String({ title: "URL" }),
    alt: Type.String({ title: "Alt text" }),
  },
  { title: "Image" },
);

export type CardImage = Static<typeof CardImageSchema>;

export const CardLinkSchema = Type.Object(
  {
    label: Type.String({ title: "Label" }),
    href: Type.String({ title: "URL" }),
  },
  { title: "Link" },
);

export type CardLink = Static<typeof CardLinkSchema>;

export const CardSchema = Type.Object({
  id: Type.String(),
  variant: CardVariantSchema,
  styleVariant: Type.Optional(SiteThemeStyleSchema),
  date: Type.Optional(Type.String({ title: "Date (YYYY-MM-DD)" })),
  heading: Type.String({ title: "Heading", default: "New card" }),
  subHeading: Type.Optional(Type.String({ title: "Subheading" })),
  link: Type.Optional(CardLinkSchema),
  image: Type.Optional(CardImageSchema),
  icon: Type.Optional(Type.String({ title: "Icon" })),
  backgroundColor: Type.Optional(Type.String({ title: "Background color" })),
});

export type Card = Static<typeof CardSchema>;

export const CardGridSchema = Type.Object({
  id: Type.String(),
  title: Type.String({ title: "Heading" }),
  cards: Type.Array(CardSchema, {
    title: "Cards",
  }),
});
