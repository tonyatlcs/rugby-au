import type { CardGridComponent, SiteTheme } from "@rugby-au/contracts";
import type { ReactNode } from "react";
import clsx from "clsx";
import { ImageCard } from "@/components/elements/ImageCard/ImageCard";
import styles from "@/features/page/pages/PageEditor/PageEditor.module.scss";

export const PageEditorNode = ({
  selected,
  label,
  children,
}: {
  selected: boolean;
  label: string;
  children: ReactNode;
}) => (
  <div className={clsx(styles.sectionWrapper, { [styles.selected]: selected })}>
    {selected && (
      <span className={styles.sectionLabel}>
        <span aria-hidden="true" />
        {label}
      </span>
    )}
    {children}
  </div>
);

export const PageEditorCardGrid = ({ component, selected, siteStyle }: {
  component: CardGridComponent;
  selected: boolean;
  siteStyle: SiteTheme["style"];
}) => (
  <PageEditorNode selected={selected} label="Card Grid">
    <div className={styles.cardGrid} onClick={(event) => {
      if ((event.target as HTMLElement).closest("a")) event.preventDefault();
    }}>
      {component.props.title && <h3>{component.props.title}</h3>}
      {component.props.cards.length > 0 ? (
        <div className={styles.cards}>
          {component.props.cards.map((card) => <ImageCard key={card.id} {...card} siteStyle={siteStyle} />)}
        </div>
      ) : (
        <div className={styles.placeholder}>Add a card to this grid</div>
      )}
    </div>
  </PageEditorNode>
);
