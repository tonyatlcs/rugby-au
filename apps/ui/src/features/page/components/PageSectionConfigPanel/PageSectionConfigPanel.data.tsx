import { Check, Plus } from "lucide-react";
import clsx from "clsx";
import { TextInput } from "@/components/controls/TextInput";
import type {
  Section as SectionConfig,
  SectionComponent,
} from "@rugby-au/contracts";
import type { PageEditorContextProps } from "@/providers/PageEditor/PageEditorContext";
import styles from "./PageSectionConfigPanel.module.scss";

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
        <>
          <button type="button" className={styles.addContent} disabled>
            <Plus size={16} aria-hidden="true" /> Add content to this section
          </button>
          <p className={styles.hint}>Adding card grids is coming soon.</p>
        </>
      ),
    },
  ];
};
