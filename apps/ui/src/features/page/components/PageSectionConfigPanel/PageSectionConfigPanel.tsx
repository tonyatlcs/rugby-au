"use client";

import { Square } from "lucide-react";
import type { CSSProperties } from "react";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { usePageEditorManager } from "@/providers/PageEditor";
import { ComponentEditorDetails } from "@/features/page/components/ComponentEditorDetails/ComponentEditorDetails";
import { getSectionConfigGroups } from "./PageSectionConfigPanel.data";
import styles from "./PageSectionConfigPanel.module.scss";

export const PageSectionConfigPanel = () => {
  const { selectedComponent, updateSection, siteTheme } = usePageEditorManager();
  if (!selectedComponent || selectedComponent.type !== "section") return null;
  const selectedSection = selectedComponent;

  const groups = getSectionConfigGroups(selectedSection, updateSection);

  return (
    <div className={styles.panel} style={{
      "--site-background-color": siteTheme.backgroundColor,
      "--site-light-background-color": siteTheme.lightBackgroundColor,
      "--site-primary-color": siteTheme.primaryColor,
    } as CSSProperties}>
      <SideNavSection
        className={styles.header}
        primaryTitle="Edit Section"
        titleIcon={
          <span className={styles.headerIcon}>
            <Square size={16} aria-hidden="true" />
          </span>
        }
      >
        <p>Section · {selectedSection.name || "Untitled"}</p>
      </SideNavSection>
      <div className={styles.body}>
        {groups.map(({ title, content }) => (
          <ComponentEditorDetails key={title} title={title}>
            {content}
          </ComponentEditorDetails>
        ))}
      </div>
    </div>
  );
};
