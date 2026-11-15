"use client";

import { Grid2X2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/controls/Button";
import { DropdownInput } from "@/components/controls/DropdownInput";
import { TextInput } from "@/components/controls/TextInput";
import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { ComponentEditorDetails } from "@/features/page/components/ComponentEditorDetails/ComponentEditorDetails";
import { findParentSection } from "@/lib/utils/component-tree-utils";
import { usePageEditorManager } from "@/providers/PageEditor";
import type { CardGridComponent } from "@rugby-au/contracts";
import styles from "@/features/page/components/PageCardGridConfigPannel/PageCardGridConfigPannel.module.scss";

export const PageCardGridConfigPannel = () => {
  const { selectedComponent, componentTree, updateCardGrid } =
    usePageEditorManager();
  if (!selectedComponent || selectedComponent.type !== "card-grid") return null;

  const grid = selectedComponent;
  const parent = findParentSection(componentTree, grid.id);
  const cards = grid.props.cards;
  const updateCard = (
    id: string,
    updates: Partial<CardGridComponent["props"]["cards"][number]>,
  ) => {
    updateCardGrid(grid.id, {
      cards: cards.map((card) =>
        card.id === id ? { ...card, ...updates } : card,
      ),
    });
  };

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
                <div className={styles.cardFields}>
                  <TextInput
                    label={`Card ${index + 1} heading`}
                    width="100%"
                    clearable={false}
                    value={card.heading}
                    onChange={(event) =>
                      updateCard(card.id, { heading: event.target.value })
                    }
                  />
                  <DropdownInput<"image" | "icon">
                    label="Variant"
                    fullWidth
                    options={[
                      { label: "Image", value: "image" },
                      { label: "Icon", value: "icon" },
                    ]}
                    value={card.variant}
                    onChange={(variant) => updateCard(card.id, { variant })}
                  />
                  <TextInput
                    label="Date (YYYY-MM-DD)"
                    width="100%"
                    clearable={false}
                    value={card.date ?? ""}
                    onChange={(event) => updateCard(card.id, { date: event.target.value })}
                  />
                  <TextInput
                    label="Subheading"
                    width="100%"
                    clearable={false}
                    value={card.subHeading ?? ""}
                    onChange={(event) =>
                      updateCard(card.id, { subHeading: event.target.value })
                    }
                  />
                  <TextInput
                    label="Link label"
                    width="100%"
                    clearable={false}
                    value={card.link?.label ?? ""}
                    onChange={(event) =>
                      updateCard(card.id, {
                        link: {
                          label: event.target.value,
                          href: card.link?.href ?? "",
                        },
                      })
                    }
                  />
                  <TextInput
                    label="Link URL"
                    width="100%"
                    clearable={false}
                    value={card.link?.href ?? ""}
                    onChange={(event) =>
                      updateCard(card.id, {
                        link: {
                          label: card.link?.label ?? "",
                          href: event.target.value,
                        },
                      })
                    }
                  />
                  <TextInput
                    label="Image URL"
                    width="100%"
                    clearable={false}
                    value={card.image?.url ?? ""}
                    onChange={(event) =>
                      updateCard(card.id, {
                        image: {
                          url: event.target.value,
                          alt: card.image?.alt ?? "",
                        },
                      })
                    }
                  />
                  <TextInput
                    label="Image alt text"
                    width="100%"
                    clearable={false}
                    value={card.image?.alt ?? ""}
                    onChange={(event) =>
                      updateCard(card.id, {
                        image: {
                          url: card.image?.url ?? "",
                          alt: event.target.value,
                        },
                      })
                    }
                  />
                  <TextInput
                    label="Icon"
                    width="100%"
                    clearable={false}
                    value={card.icon ?? ""}
                    onChange={(event) =>
                      updateCard(card.id, { icon: event.target.value })
                    }
                  />
                  <TextInput
                    label="Background color"
                    width="100%"
                    clearable={false}
                    value={card.backgroundColor ?? ""}
                    onChange={(event) =>
                      updateCard(card.id, {
                        backgroundColor: event.target.value,
                      })
                    }
                  />
                </div>
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
