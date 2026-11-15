"use client";

import React from "react";
import { usePageEditorManager } from "@/providers/PageEditor";

export const PageSectionConfigPanel: React.FC = () => {
  const { sectionConfig, setSectionConfig, addNewSection } = usePageEditorManager();

  return (
    <div>
      <h2>Section layout</h2>

      <button
        type="button"
        aria-pressed={sectionConfig.layout === "full"}
        onClick={() => setSectionConfig((current) => ({ ...current, layout: "full" }))}
      >
        Full width
      </button>

      <button
        type="button"
        aria-pressed={sectionConfig.layout === "two-column"}
        onClick={() => setSectionConfig((current) => ({ ...current, layout: "two-column" }))}
      >
        Two columns
      </button>
      <button
        type="button"
        aria-pressed={sectionConfig.layout === "three-column"}
        onClick={() => setSectionConfig((current) => ({ ...current, layout: "three-column" }))}
      >
        Three columns
      </button>

      <h2>Section theme</h2>
      {(["none", "light", "brand"] as const).map((theme) => (
        <button
          key={theme}
          type="button"
          aria-pressed={sectionConfig.themeType === theme}
          onClick={() => setSectionConfig((current) => ({ ...current, themeType: theme }))}
        >
          {theme === "none" ? "None" : theme === "light" ? "Light" : "Brand"}
        </button>
      ))}

      <button type="button" onClick={addNewSection}>Add section</button>
    </div>
  );
};
