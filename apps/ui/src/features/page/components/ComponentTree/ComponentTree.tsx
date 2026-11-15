import { Fragment, type ReactNode } from "react";
import type { ComponentNode, SiteTheme } from "@rugby-au/contracts";
import { Section } from "@/components/elements/Section/Section";
import { ImageCard } from "@/components/elements/ImageCard/ImageCard";
import styles from "./ComponentTree.module.scss";

type ComponentTreeProps = {
  components: ComponentNode[];
  siteStyle: SiteTheme["style"];
  renderNode?: (component: ComponentNode, content: ReactNode) => ReactNode;
  renderEmptySlot?: (index: number, columnCount: number) => ReactNode;
  renderEmptyCardGrid?: () => ReactNode;
};

export const ComponentTree = ({
  components,
  siteStyle,
  renderNode,
  renderEmptySlot,
  renderEmptyCardGrid,
}: ComponentTreeProps) => {
  const renderComponent = (component: ComponentNode): ReactNode => {
    const content = (
      <>
        {component.type === "section" && (
          <Section {...component.props} renderEmptySlot={renderEmptySlot}>
            {component.children.map(renderComponent)}
          </Section>
        )}
        {component.type === "card-grid" && (
          <div className={styles.cardGrid}>
            {component.props.title && <h3>{component.props.title}</h3>}
            {component.props.cards.length > 0 && (
              <div className={styles.cards}>
                {component.props.cards.map((card) => (
                  <ImageCard key={card.id} {...card} siteStyle={siteStyle} />
                ))}
              </div>
            )}
            {component.props.cards.length === 0 && renderEmptyCardGrid?.()}
          </div>
        )}
      </>
    );

    return <Fragment key={component.id}>{renderNode ? renderNode(component, content) : content}</Fragment>;
  };

  return <>{components.map(renderComponent)}</>;
};
