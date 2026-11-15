import { Children, type ReactNode } from "react";
import type { Section as SectionConfig } from "@rugby-au/contracts";
import clsx from "clsx";
import styles from "@/components/elements/Section/Section.module.scss";

interface SectionProps extends SectionConfig {
  children?: ReactNode;
  renderEmptySlot?: (index: number, columnCount: number) => ReactNode;
}

export const Section = ({
  headerLabel,
  layout,
  themeType,
  children,
  renderEmptySlot,
}: SectionProps) => {
  const columnCount =
    layout === "three-column" ? 3 : layout === "two-column" ? 2 : 1;
  const emptySlots = Math.max(0, columnCount - Children.count(children));

  return (
    <section className={clsx(styles.section, styles[themeType])}>
      <div
        className={clsx(styles.content, layout !== "full" && styles[layout])}
      >
        {headerLabel && <h3 className={styles.heading}>{headerLabel}</h3>}
        {children}
        {renderEmptySlot &&
          Array.from({ length: emptySlots }, (_, index) =>
            renderEmptySlot(index, columnCount),
          )}
      </div>
    </section>
  );
};
