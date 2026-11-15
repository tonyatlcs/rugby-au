"use client";

import { Grid2X2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/controls/Button";
import { TextInput } from "@/components/controls/TextInput";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { ComponentEditorDetails } from "@/features/page/components/ComponentEditorDetails/ComponentEditorDetails";
import { findParentSection } from "@/lib/utils/component-tree-utils";
import { usePageEditorManager } from "@/providers/PageEditor";
import styles from "./PageCardGridConfigPannel.module.scss";

export const PageCardGridConfigPannel = () => {
  const { selectedComponent, componentTree, updateCardGrid } =
    usePageEditorManager();
  if (!selectedComponent || selectedComponent.type !== "card-grid") return null;

  const grid = selectedComponent;
  const parent = findParentSection(componentTree, grid.id);
  const cards = grid.props.cards;

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
        <ComponentEditorDetails title="Details">
          <TextInput
            label="Heading"
            width="100%"
            clearable={false}
            value={grid.props.title}
            onChange={(event) =>
              updateCardGrid(grid.id, { title: event.target.value })
            }
          />
        </ComponentEditorDetails>
        <ComponentEditorDetails title={`Cards (${cards.length})`}>
          <div className={styles.cards}>
            {cards.map((card, index) => (
              <div className={styles.card} key={card.id}>
                <TextInput
                  label={`Card ${index + 1} heading`}
                  width="100%"
                  clearable={false}
                  value={card.heading}
                  onChange={(event) =>
                    updateCardGrid(grid.id, {
                      cards: cards.map((item) =>
                        item.id === card.id
                          ? { ...item, heading: event.target.value }
                          : item,
                      ),
                    })
                  }
                />
                <button
                  type="button"
                  className={styles.removeCard}
                  aria-label={`Remove card ${index + 1}`}
                  onClick={() =>
                    updateCardGrid(grid.id, {
                      cards: cards.filter((item) => item.id !== card.id),
                    })
                  }
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <Button
              type="button"
              buttonColor="secondary"
              buttonSize="medium"
              fullWidth
              startAdornment={<Plus size={16} aria-hidden="true" />}
              onClick={() =>
                updateCardGrid(grid.id, {
                  cards: [
                    ...cards,
                    {
                      id: crypto.randomUUID(),
                      variant: "image",
                      heading: "New card",
                    },
                  ],
                })
              }
            >
              Add card
            </Button>
          </div>
        </ComponentEditorDetails>
      </div>
    </div>
  );
};
