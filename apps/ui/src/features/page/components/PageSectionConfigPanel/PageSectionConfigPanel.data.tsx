import { Check, Plus } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/controls/Button";
import { TextInput } from "@/components/controls/TextInput";
import type {
  Section as SectionConfig,
  SectionComponent,
} from "@rugby-au/contracts";
import type { PageEditorContextProps } from "@/providers/PageEditor/PageEditorContext";
import styles from "@/features/page/components/PageSectionConfigPanel/PageSectionConfigPanel.module.scss";

const layouts: {
  value: SectionConfig["layout"];
  label: string;
  columns: number;
}[] = [
  { value: "full", label: "Full width", columns: 1 },
  { value: "two-column", label: "Two columns", columns: 2 },
  { value: "three-column", label: "Three columns", columns: 3 },
];
const themes: { value: SectionConfig["themeType"]; label: string }[] = [
  { value: "none", label: "None" },
  { value: "light", label: "Light" },
  { value: "brand", label: "Brand" },
];

export const getSectionConfigGroups = (
  selectedSection: SectionComponent,
  updateSection: PageEditorContextProps["updateSection"],
  addComponent: PageEditorContextProps["addComponent"],
) => {
  return [
    {
      title: "Details",
      content: (
        <>
          <TextInput
            label="Editor label"
            width="100%"
            clearable={false}
            value={selectedSection.name}
            onChange={(event) =>
              updateSection(selectedSection.id, { name: event.target.value })
            }
          />
          <p className={styles.hint}>Only visible in the page structure.</p>
          <TextInput
            label="Section title"
            width="100%"
            clearable={false}
            value={selectedSection.props.headerLabel ?? ""}
            onChange={(event) =>
              updateSection(selectedSection.id, {
                props: { headerLabel: event.target.value },
              })
            }
          />
        </>
      ),
    },
    {
      title: "Layout",
      content: (
        <>
          <div
            className={styles.layoutOptions}
            role="group"
            aria-label="Section layout"
          >
            {layouts.map(({ value, label, columns }) => (
              <button
                key={value}
                type="button"
                className={styles.option}
                onClick={() =>
                  updateSection(selectedSection.id, {
                    props: { layout: value },
                  })
                }
              >
                {selectedSection.props.layout === value && (
                  <Check
                    className={styles.check}
                    size={13}
                    aria-hidden="true"
                  />
                )}
                <span className={styles.layoutPreview} aria-hidden="true">
                  {Array.from({ length: columns }, (_, index) => (
                    <span key={index} />
                  ))}
                </span>
                {label}
              </button>
            ))}
          </div>
        </>
      ),
    },
    {
      title: "Background",
      content: (
        <>
          <div
            className={styles.themeOptions}
            role="group"
            aria-label="Section background"
          >
            {themes.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={styles.option}
                onClick={() =>
                  updateSection(selectedSection.id, {
                    props: { themeType: value },
                  })
                }
              >
                {selectedSection.props.themeType === value && (
                  <Check
                    className={styles.check}
                    size={13}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={clsx(styles.swatch, styles[value])}
                  aria-hidden="true"
                />
                {label}
              </button>
            ))}
          </div>
          <p className={styles.hint}>Colours follow the website’s theme.</p>
        </>
      ),
    },
    {
      title: "Content",
      content: (
        <div className={styles.contentActions}>
        <Button
          type="button"
          buttonColor="secondary"
          buttonSize="medium"
          fullWidth
          startAdornment={<Plus size={16} aria-hidden="true" />}
          onClick={() => addComponent("card-grid", selectedSection.id)}
        >
          Add card grid
        </Button>
        <Button
          type="button"
          buttonColor="secondary"
          buttonSize="medium"
          fullWidth
          startAdornment={<Plus size={16} aria-hidden="true" />}
          onClick={() => addComponent("section", selectedSection.id)}
        >
          Add section inside this section
        </Button>
        </div>
      ),
    },
  ];
};
