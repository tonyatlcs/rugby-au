import type { ReactNode } from "react";
import type { Section as SectionConfig } from "@rugby-au/contracts";
import clsx from "clsx";
import styles from "./Section.module.scss";

interface SectionProps extends SectionConfig {
  children?: ReactNode;
}

export const Section = ({ layout, themeType, children }: SectionProps) => (
  <section className={clsx(styles.section, styles[themeType])}>
    <div className={clsx(styles.content, layout !== "full" && styles[layout])}>
      {children}
    </div>
  </section>
);
