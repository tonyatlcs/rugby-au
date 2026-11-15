import type {
  CardGridComponent,
  ComponentNode,
  SectionComponent,
} from "@rugby-au/contracts";

/** Fields to update on a section. Props and children replace the existing values. */
export type SectionUpdates = {
  name?: string;
  props?: SectionComponent["props"];
  children?: SectionComponent["children"];
};

/** Card grid props to merge shallowly into an existing card grid. */
export type CardGridUpdates = Partial<CardGridComponent["props"]>;

type NodeUpdates =
  | { type: "section"; updates: SectionUpdates }
  | { type: "card-grid"; updates: CardGridUpdates };

/**
 * Finds the first section that directly contains a component with the given ID.
 * Sections are searched depth-first; root nodes have no parent section.
 *
 * @param nodes - Root nodes to search.
 * @param id - ID of the child component.
 * @returns The parent section, or null if none is found.
 */
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
 * Returns a new tree with nodes matching both the ID and change type updated.
 * Section props and children, when supplied, replace the existing values;
 * a card grid's title also updates its node name. A matched
 * section's descendants are not searched for further matches.
 *
 * @param nodes - Root nodes to update.
 * @param id - ID of the node to update.
 * @param change - Node type and fields to apply.
 * @returns A new root array containing the updated tree, even if nothing matches.
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
        props: change.updates.props ?? node.props,
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

/**
 * Removes every component with the given ID, including its descendants.
 *
 * @param nodes - Root nodes to search.
 * @param id - ID of the component to remove.
 * @returns A new root array containing the remaining tree, even if nothing matches.
 */
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
