"use client";

import { useState } from "react";
import { SideNav } from "@/components/elements/SideNav/SideNav";
import { Tab } from "@/components/elements/Tabs/Tab";
import { PageTreeSection } from "@/features/page/components/PageTreeSection/PageTreeSection";
import { PageComponentDestinationSection } from "@/features/page/components/PageComponentDestinationSection/PageComponentDestinationSection";
import { PageComponentSection } from "@/features/page/components/PageComponentsSection/PageComponentSection";
import styles from "./PageEditorLeftControlPanel.module.scss";

export const PageEditorLeftControlPanel = () => {
  const [tab, setTab] = useState<string>("pageStructure");

  return (
    <SideNav orientation="left">
      <div className={styles.tagContainer}>
        <Tab
          tabs={[
            { label: "Page Structure", value: "pageStructure" },
            { label: "Add components", value: "addComponents" },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {tab === "pageStructure" ? (
        <PageTreeSection onAddSection={() => setTab("addComponents")} />
      ) : (
        <>
          <PageComponentDestinationSection />
          <PageComponentSection />
        </>
      )}
    </SideNav>
  );
};
