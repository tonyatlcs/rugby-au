import { Archivo } from "next/font/google";

export const editorialFont = Archivo({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--editorial-heading-font",
});
