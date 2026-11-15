"use client";

import type { ComponentNode } from "@rugby-au/contracts";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { PageTree } from "@/features/page/components/PageTree/PageTree";
import { usePageEditorManager } from "@/providers/PageEditor";
import styles from "@/features/page/components/PageTreeSection/PageTreeSection.module.scss";

function countComponents(components: ComponentNode[]): number {
  return components.reduce(
    (count, component) =>
      count +
      1 +
      (component.type === "section" ? countComponents(component.children) : 0),
    0,
  );
}

interface PageTreeSectionProps {
  onAddSection: () => void;
}

export const PageTreeSection: React.FC<PageTreeSectionProps> = ({ onAddSection }) => {
  const { summary, componentTree } = usePageEditorManager();
  const count = countComponents(componentTree);

  return (
    <SideNavSection
      primaryTitle="Page Tree"
      secondaryTitle={
        <span className={styles.pageTreeComponentCount}>
          {count} {count === 1 ? "component" : "components"}
        </span>
      }
    >
      <PageTree title={summary.title} components={componentTree} onAddSection={onAddSection} />
    </SideNavSection>
  );
};
