import type { CardGridComponent } from "@rugby-au/contracts";
import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./PageEditor.module.scss";

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

export const PageEditorCardGrid = ({ component, selected }: {
  component: CardGridComponent;
  selected: boolean;
}) => (
  <PageEditorNode selected={selected} label="Card Grid">
    <div className={styles.placeholder}>Card Grid · {component.name}</div>
  </PageEditorNode>
);
