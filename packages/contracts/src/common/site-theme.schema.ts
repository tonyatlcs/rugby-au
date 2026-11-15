import { Type, type Static } from "@sinclair/typebox";

export const SiteThemeStyleSchema = Type.Union([
  Type.Literal("editorial"),
  Type.Literal("promotional"),
]);

export type SiteThemeStyle = Static<typeof SiteThemeStyleSchema>;

export const SiteThemeSchema = Type.Object({
  style: SiteThemeStyleSchema,
  primaryColor: Type.String({ maxLength: 7 }),
  backgroundColor: Type.String({ maxLength: 7 }),
  lightBackgroundColor: Type.String({ maxLength: 7 }),
  textColor: Type.String({ maxLength: 7 }),
  lightTextColor: Type.String({ maxLength: 7 }),
  brandTextColor: Type.String({ maxLength: 7 }),
  fontFamily: Type.String(),
});

export type SiteTheme = Static<typeof SiteThemeSchema>;
