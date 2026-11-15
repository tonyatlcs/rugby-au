import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "@/features/page/pages/PageEditor/PageEditor.module.scss";

export const PageEditorNode = ({
  selected,
  label,
  children,
}: {
  selected: boolean;
  label: string;
  children: ReactNode;
}) => (
  <div className={clsx(styles.sectionWrapper, { [styles.selected]: selected })}>
    {selected && (
      <span className={styles.sectionLabel}>
        <span aria-hidden="true" />
        {label}
      </span>
    )}
    {children}
  </div>
);

