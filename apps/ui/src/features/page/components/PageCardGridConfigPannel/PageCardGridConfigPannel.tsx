"use client";

import { Grid2X2 } from "lucide-react";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { ComponentEditorDetails } from "@/features/page/components/ComponentEditorDetails/ComponentEditorDetails";
import {
  ComponentPropsEditor,
  type FormConfig,
} from "@/features/page/components/ComponentPropsEditor/ComponentPropsEditor";
import { findParentSection } from "@/lib/utils/component-tree-utils";
import { usePageEditorManager } from "@/providers/PageEditor";
import { CardGridSchema } from "@rugby-au/contracts";
import styles from "./PageCardGridConfigPannel.module.scss";

const cardGridFormConfig: FormConfig = {
  id: { hidden: true },
  cards: { itemLabel: "Card" },
  "cards.id": { hidden: true, createDefault: () => crypto.randomUUID() },
  "cards.styleVariant": { hidden: true },
};

export const PageCardGridConfigPannel = () => {
  const { selectedComponent, componentTree, updateCardGrid } =
    usePageEditorManager();
  if (!selectedComponent || selectedComponent.type !== "card-grid") return null;
  const grid = selectedComponent;
  const parent = findParentSection(componentTree, grid.id);

  return (
    <div className={styles.panel}>
      <SideNavSection
        className={styles.header}
        primaryTitle="Edit Card Grid"
        titleIcon={
          <span className={styles.headerIcon}>
            <Grid2X2 size={16} aria-hidden="true" />
          </span>
        }
      >
        <p>Inside Section · {parent?.name || "Untitled"}</p>
      </SideNavSection>
      <div className={styles.body}>
        <ComponentEditorDetails title="Properties">
          <ComponentPropsEditor
            schema={CardGridSchema}
            config={cardGridFormConfig}
            value={grid.props}
            onChange={(props) => updateCardGrid(grid.id, props)}
          />
        </ComponentEditorDetails>
      </div>
    </div>
  );
};
