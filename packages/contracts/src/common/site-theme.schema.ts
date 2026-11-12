import { Type, type Static } from "@sinclair/typebox";

export const SiteThemeSchema = Type.Object({
  primaryColor: Type.String({ maxLength: 7 }),
  backgroundColor: Type.String({ maxLength: 7 }),
  textColor: Type.String({ maxLength: 7 }),
  fontFamily: Type.String(),
});

export type SiteTheme = Static<typeof SiteThemeSchema>;
