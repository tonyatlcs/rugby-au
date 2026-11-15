"use client";

import { Plus, Square } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/controls/Button";
import { TextInput } from "@/components/controls/TextInput";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { ComponentEditorDetails } from "@/features/page/components/ComponentEditorDetails/ComponentEditorDetails";
import {
  ComponentPropsEditor,
  type FormConfig,
} from "@/features/page/components/ComponentPropsEditor/ComponentPropsEditor";
import { usePageEditorManager } from "@/providers/PageEditor";
import { SectionSchema } from "@rugby-au/contracts";
import styles from "./PageSectionConfigPanel.module.scss";

const sectionFormConfig: FormConfig = {
  layout: {
    control: "layout",
    previews: {
      full: { columns: 1 },
      "two-column": { columns: 2 },
      "three-column": { columns: 3 },
    },
  },
  themeType: {
    control: "swatch",
    previews: {
      none: { color: "var(--site-background-color)" },
      light: { color: "var(--site-light-background-color)" },
      brand: { color: "var(--site-primary-color)" },
    },
  },
};

export const PageSectionConfigPanel = () => {
  const { selectedComponent, updateSection, addComponent, siteTheme } =
    usePageEditorManager();
  if (!selectedComponent || selectedComponent.type !== "section") return null;
  const section = selectedComponent;

  return (
    <div
      className={styles.panel}
      style={
        {
          "--site-background-color": siteTheme.backgroundColor,
          "--site-light-background-color": siteTheme.lightBackgroundColor,
          "--site-primary-color": siteTheme.primaryColor,
        } as CSSProperties
      }
    >
      <SideNavSection
        className={styles.header}
        primaryTitle="Edit Section"
        titleIcon={
          <span className={styles.headerIcon}>
            <Square size={16} aria-hidden="true" />
          </span>
        }
      >
        <p>Section · {section.name || "Untitled"}</p>
      </SideNavSection>
      <div className={styles.body}>
        <ComponentEditorDetails title="Properties">
          <TextInput
            label="Editor label"
            width="100%"
            clearable={false}
            value={section.name}
            onChange={(event) =>
              updateSection(section.id, { name: event.target.value })
            }
          />
          <p className={styles.hint}>Only visible in the page structure.</p>
          <ComponentPropsEditor
            schema={SectionSchema}
            config={sectionFormConfig}
            value={section.props}
            onChange={(props) => updateSection(section.id, { props })}
          />
        </ComponentEditorDetails>
        <ComponentEditorDetails title="Content">
          <div className={styles.contentActions}>
            <Button
              type="button"
              buttonColor="secondary"
              buttonSize="medium"
              fullWidth
              startAdornment={<Plus size={16} aria-hidden="true" />}
              onClick={() => addComponent("card-grid", section.id)}
            >
              Add card grid
            </Button>
            <Button
              type="button"
              buttonColor="secondary"
              buttonSize="medium"
              fullWidth
              startAdornment={<Plus size={16} aria-hidden="true" />}
              onClick={() => addComponent("section", section.id)}
            >
              Add section inside this section
            </Button>
          </div>
        </ComponentEditorDetails>
      </div>
    </div>
  );
};
