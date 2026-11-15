"use client";

import { SideNav } from "@/components/elements/SideNav/SideNav";
import { Tab } from "@/components/elements/Tabs/Tab";
import { PageTreeSection } from "@/features/page/components/PageTreeSection/PageTreeSection";
import { PageComponentDestinationSection } from "@/features/page/components/PageComponentDestinationSection/PageComponentDestinationSection";
import { PageComponentSection } from "@/features/page/components/PageComponentsSection/PageComponentSection";
import styles from "./PageEditorLeftControlPanel.module.scss";
import { usePageEditorManager } from "@/providers/PageEditor";

export const PageEditorLeftControlPanel = () => {
  const {
    pageEditorLeftPanelView,
    setPageEditorLeftPanelView,
    addNewSection,
  } = usePageEditorManager();

  return (
    <SideNav orientation="left">
      <div className={styles.tagContainer}>
        <Tab
          tabs={[
            { label: "Page Structure", value: "pageStructure" },
            { label: "Add components", value: "addComponents" },
          ]}
          value={pageEditorLeftPanelView}
          onChange={(value) => {
            if (value === "pageStructure" || value === "addComponents") {
              setPageEditorLeftPanelView(value);
            }
          }}
        />
      </div>

      {pageEditorLeftPanelView === "pageStructure" ? (
        <PageTreeSection
          onAddSection={() => setPageEditorLeftPanelView("addComponents")}
        />
      ) : (
        <>
          <PageComponentDestinationSection />
          <PageComponentSection
            onAddSection={addNewSection}
          />
        </>
      )}
    </SideNav>
  );
};
