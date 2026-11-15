"use client";

import React from "react";
import { Section } from "@/components/elements/Section/Section";
import { PageEditorFrame } from "@/features/page/components/PageEditorFrame/PageEditorFrame";
import { usePageEditorManager } from "@/providers/PageEditor";
import type { ComponentNode } from "@rugby-au/contracts";
import { PageEditorCardGrid, PageEditorNode } from "./PageEditorNode";
import styles from "./PageEditor.module.scss";

const renderComponent = (
  component: ComponentNode,
  selectedComponentId: string | null,
): React.ReactNode => {
  const isSelected = component.id === selectedComponentId;
  if (component.type === "card-grid") {
    return (
      <PageEditorCardGrid key={component.id} component={component} selected={isSelected} />
    );
  }

  return (
    <PageEditorNode key={component.id} selected={isSelected} label="Section">
      <Section
        {...component.props}
        renderEmptySlot={(index, columnCount) => (
          <div key={`empty-${index}`} className={styles.placeholder}>
            {columnCount === 1 ? "Empty section" : "Empty column"}
          </div>
        )}
      >
        {component.children.map((child) =>
          renderComponent(child, selectedComponentId),
        )}
      </Section>
    </PageEditorNode>
  );
};

export const PageEditor: React.FC = () => {
  const { summary, componentTree, siteTheme, selectedComponentId } =
    usePageEditorManager();

  return (
    <PageEditorFrame title={summary.title} theme={siteTheme}>
      {componentTree.map((component) =>
        renderComponent(component, selectedComponentId),
      )}
    </PageEditorFrame>
  );
};
