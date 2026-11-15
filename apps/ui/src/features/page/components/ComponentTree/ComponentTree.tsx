import { Fragment, type ReactNode } from "react";
import type { ComponentNode, SiteTheme } from "@rugby-au/contracts";
import { Section } from "@/components/elements/Section/Section";
import { ContentCard } from "@/components/elements/ContentCard/ContentCard";
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
            {/* Render each child the same way; nested sections repeat this step. */}
            {component.children.map(renderComponent)}
          </Section>
        )}
        {component.type === "card-grid" && (
          // Card grids are leaves: their cards don't contain component nodes.
          <div className={styles.cardGrid}>
            {component.props.title && <h3>{component.props.title}</h3>}
            {component.props.cards.length > 0 && (
              <div className={styles.cards}>
                {component.props.cards.map((card) => (
                  <ContentCard key={card.id} {...card} siteStyle={siteStyle} />
                ))}
              </div>
            )}
            {component.props.cards.length === 0 && renderEmptyCardGrid?.()}
          </div>
        )}
      </>
    );

    // The editor can wrap each component; public pages render the content directly.
    return <Fragment key={component.id}>{renderNode ? renderNode(component, content) : content}</Fragment>;
  };

  // Start with the top-level components and work down through their children.
  return <>{components.map(renderComponent)}</>;
};
