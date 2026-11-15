"use client";

import type { ComponentNode } from "@rugby-au/contracts";
import { usePageEditorManager } from "@/providers/PageEditor";
import clsx from "clsx";
import { Check, Grid2X2, Square } from "lucide-react";
import styles from "@/features/page/components/PageTreeNode/PageTreeNode.module.scss";

interface PageTreeNodeProps {
  component: ComponentNode;
}

export const PageTreeNode = ({ component }: PageTreeNodeProps) => {
  const children = component.type === "section" ? component.children : [];
  const isSection = component.type === "section";
  const { selectComponent, selectedComponentId } = usePageEditorManager();
  const isSelected = selectedComponentId === component.id;

  return (
    <li className={styles.node}>
      <button type="button" className={styles.row} aria-pressed={isSelected} onClick={() => selectComponent(component)}>
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
        {isSelected && <Check className={styles.check} size={16} aria-hidden="true" />}
      </button>
      {children.length > 0 && (
        <ul className={styles.children}>
          {children.map((child) => <PageTreeNode key={child.id} component={child} />)}
        </ul>
      )}
    </li>
  );
};
