import type { ComponentNode } from "@rugby-au/contracts";
import clsx from "clsx";
import { ChevronDown, Grid2X2, Square } from "lucide-react";
import styles from "./PageTreeNode.module.scss";

interface PageTreeNodeProps {
  component: ComponentNode;
}

export const PageTreeNode = ({ component }: PageTreeNodeProps) => {
  const children = component.type === "section" ? component.children : [];
  const isSection = component.type === "section";

  return (
    <li className={styles.node}>
      <div className={styles.row}>
        <span className={styles.chevron} aria-hidden="true">
          {children.length > 0 && <ChevronDown size={16} />}
        </span>
        <span className={clsx(styles.icon, {
          [styles.sectionIcon]: isSection,
          [styles.gridIcon]: !isSection,
        })}>
          {isSection ? <Square size={16} /> : <Grid2X2 size={16} />}
        </span>
        <span className={styles.label}>
          <span className={styles.type}>{isSection ? "Section" : "Card Grid"} · </span>
          {component.name}
        </span>
      </div>
      {children.length > 0 && (
        <ul className={styles.children}>
          {children.map((child) => <PageTreeNode key={child.id} component={child} />)}
        </ul>
      )}
    </li>
  );
};
