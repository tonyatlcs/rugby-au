import type { CSSProperties, ReactNode } from "react";
import type { SiteTheme } from "@rugby-au/contracts";
import styles from "./SiteThemeWrapper.module.scss";

export const SiteThemeWrapper = ({
  theme,
  children,
  className,
}: {
  theme: SiteTheme;
  children?: ReactNode;
  className?: string;
}) => {
  const fontFamily = theme.fontFamily.trim();

  return (
    <>
      {fontFamily && (
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?${new URLSearchParams({ family: fontFamily, display: "swap" })}`}
        />
      )}
      <div
        className={[styles.theme, className].filter(Boolean).join(" ")}
        style={{
          "--site-background-color": theme.backgroundColor,
          "--site-primary-color": theme.primaryColor,
          "--site-light-background-color": theme.lightBackgroundColor,
          "--site-text-color": theme.textColor,
          "--site-light-text-color": theme.lightTextColor,
          "--site-brand-text-color": theme.brandTextColor,
          "--site-font-family": fontFamily ? `${JSON.stringify(fontFamily)}, sans-serif` : "sans-serif",
        } as CSSProperties}
      >
        {children}
      </div>
    </>
  );
};
