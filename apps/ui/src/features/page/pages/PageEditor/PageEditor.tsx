"use client";

import React from "react";
import { Section } from "@/components/elements/Section/Section";
import { PageEditorFrame } from "@/features/page/components/PageEditorFrame/PageEditorFrame";
import { usePageEditorManager } from "@/providers/PageEditor";
import type { ComponentNode } from "@rugby-au/contracts";
import clsx from "clsx";
import styles from "./PageEditor.module.scss";

const renderComponent = (component: ComponentNode, selectedComponentId: string | null): React.ReactNode => {
  if (component.type === "card-grid") {
    return <div key={component.id} className={styles.placeholder}>Card Grid · {component.name}</div>;
  }

  const isSelected = component.id === selectedComponentId;
  const columnCount = component.props.layout === "three-column" ? 3 : component.props.layout === "two-column" ? 2 : 1;
  const emptyColumns = Math.max(0, columnCount - component.children.length);
  return (
    <div key={component.id} className={clsx(styles.sectionWrapper, { [styles.selected]: isSelected })}>
      {isSelected && <span className={styles.sectionLabel}><span aria-hidden="true" />Section</span>}
      <Section {...component.props}>
        {component.children.map((child) => renderComponent(child, selectedComponentId))}
        {Array.from({ length: emptyColumns }, (_, index) => (
          <div key={`empty-${index}`} className={styles.placeholder}>
            {columnCount === 1 ? "Empty section" : "Empty column"}
          </div>
        ))}
      </Section>
    </div>
  );
};

export const PageEditor: React.FC = () => {
  const { summary, componentTree, siteTheme, selectedComponentId } = usePageEditorManager();

  return (
    <PageEditorFrame title={summary.title} theme={siteTheme}>
      {componentTree.map((component) => renderComponent(component, selectedComponentId))}
    </PageEditorFrame>
  );
};
