"use client";

import { PageNode } from "@/components/elements/PageNode/PageNode";
import type { PageTree } from "@/lib/server/schemas/page.schema";
import Tree, { type RawNodeDatum } from "react-d3-tree";
import styles from "./SiteMapTreeLayout.module.scss";

interface SiteMapTreeLayoutProps {
  siteName: string;
  url: string;
  pages: PageTree;
  selectedPageId?: string | null;
  newPageIds?: string[];
  onSelectPage?: (pageId: string) => void;
}

export const SiteMapTreeLayout: React.FC<SiteMapTreeLayoutProps> = ({
  siteName,
  pages,
  selectedPageId,
  newPageIds,
  onSelectPage,
}) => {
  const data: RawNodeDatum = { name: siteName, children: pages };

  return (
    <div className={styles.tree}>
      <Tree
        data={data}
        svgClassName="site-map-tree-svg"
        orientation="vertical"
        nodeSize={{ x: 300, y: 200 }}
        collapsible={false}
        draggable={true}
        zoomable={false}
        pathFunc={"diagonal"}
        pathClassFunc={() => styles.link}
        renderCustomNodeElement={({ nodeDatum }) => {
          const id = nodeDatum.attributes?.id as string | undefined;
          return (
            <foreignObject x={-120} y={-56} width={240} height={112}>
              <div className={styles.node}>
                <PageNode
                  variant={id ? "page" : "website"}
                  title={nodeDatum.name}
                  description={id ? undefined : "Website"}
                  path={nodeDatum.attributes?.path as string | undefined}
                  active={id === selectedPageId}
                  isNew={id ? newPageIds?.includes(id) : false}
                  onSelect={id ? () => onSelectPage?.(id) : undefined}
                />
              </div>
            </foreignObject>
          );
        }}
      />
    </div>
  );
};
