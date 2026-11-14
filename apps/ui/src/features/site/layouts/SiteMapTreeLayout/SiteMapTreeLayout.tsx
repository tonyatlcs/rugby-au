"use client";

import { PageNode } from "@/components/elements/PageNode/PageNode";
import type {
  PageInformation,
  PageTree,
} from "@/lib/server/schemas/page.schema";
import { useSyncExternalStore } from "react";
import Tree, { type RawNodeDatum } from "react-d3-tree";
import styles from "./SiteMapTreeLayout.module.scss";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

interface SiteMapTreeLayoutProps {
  siteName: string;
  url: string;
  pages: PageTree;
  selectedPage?: PageInformation | null;
  onSelectPage?: (page: PageInformation) => void;
}

export const SiteMapTreeLayout: React.FC<SiteMapTreeLayoutProps> = ({
  siteName,
  pages,
  selectedPage,
  onSelectPage,
}) => {
  // react-d3-tree generates random IDs during render, so mount it after hydration.
  const isClient = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const data: RawNodeDatum = { name: siteName, children: pages };

  return (
    <div className={styles.tree}>
      {isClient && <Tree
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
          const page = id ? findPage(pages, id) : undefined;
          return (
            <foreignObject x={-120} y={-56} width={240} height={112}>
              <div className={styles.node}>
                {page ? (
                  <PageNode
                    variant="page"
                    title={page.title}
                    description={page.path}
                    active={page.id === selectedPage?.id}
                    onSelect={() => onSelectPage?.(page)}
                  />
                ) : (
                  <PageNode
                    variant="website"
                    title={nodeDatum.name}
                    description="Website"
                  />
                )}
              </div>
            </foreignObject>
          );
        }}
      />}
    </div>
  );
};

function findPage(pages: PageTree, id: string): PageInformation | undefined {
  for (const page of pages) {
    if (page.attributes.id === id) return page.attributes;
    const child = findPage(page.children, id);
    if (child) return child;
  }
  return undefined;
}
