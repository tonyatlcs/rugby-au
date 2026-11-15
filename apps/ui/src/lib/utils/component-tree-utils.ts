import type {
  CardGridComponent,
  ComponentNode,
  SectionComponent,
} from "@rugby-au/contracts";

/** Fields that can be updated on a section; props are merged shallowly. */
export type SectionUpdates = {
  name?: string;
  props?: Partial<SectionComponent["props"]>;
  children?: SectionComponent["children"];
};

export type CardGridUpdates = Partial<CardGridComponent["props"]>;

type NodeUpdates =
  | { type: "section"; updates: SectionUpdates }
  | { type: "card-grid"; updates: CardGridUpdates };

export const findParentSection = (
  nodes: ComponentNode[],
  id: string,
): SectionComponent | null => {
  for (const node of nodes) {
    if (node.type !== "section") continue;
    if (node.children.some((child) => child.id === id)) return node;
    const parent = findParentSection(node.children, id);
    if (parent) return parent;
  }
  return null;
};

/**
 * Finds the first component with the given ID in depth-first traversal.
 * Only section nodes can contain children.
 *
 * @param nodes - Root nodes to search.
 * @param id - ID of the component to find.
 * @returns The matching node, or null if no node matches.
 */
export const findComponent = (
  nodes: ComponentNode[],
  id: string,
): ComponentNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.type === "section") {
      const match = findComponent(node.children, id);
      if (match) return match;
    }
  }
  return null;
};

/**
 * Returns a new tree with the matching node updated. Props are merged shallowly.
 *
 * @param nodes - Root nodes to update.
 * @param id - ID of the node to update.
 * @param change - Node type and fields to apply.
 * @returns A new array containing the updated tree.
 */
export const updateNodeInTree = (
  nodes: ComponentNode[],
  id: string,
  change: NodeUpdates,
): ComponentNode[] =>
  nodes.map((node) => {
    if (
      node.id === id &&
      node.type === "section" &&
      change.type === "section"
    ) {
      return {
        ...node,
        name: change.updates.name ?? node.name,
        props: { ...node.props, ...change.updates.props },
        children: change.updates.children ?? node.children,
      };
    }
    if (
      node.id === id &&
      node.type === "card-grid" &&
      change.type === "card-grid"
    ) {
      return {
        ...node,
        name: change.updates.title ?? node.name,
        props: { ...node.props, ...change.updates },
      };
    }
    return node.type === "section"
      ? { ...node, children: updateNodeInTree(node.children, id, change) }
      : node;
  });

/** Removes a component and its descendants from the tree by ID. */
export const deleteComponentFromTree = (
  nodes: ComponentNode[],
  id: string,
): ComponentNode[] =>
  nodes
    .filter((node) => node.id !== id)
    .map((node) =>
      node.type === "section"
        ? { ...node, children: deleteComponentFromTree(node.children, id) }
        : node,
    );
