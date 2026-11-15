import type { ComponentNode, SectionComponent } from "@rugby-au/contracts";

/** Fields that can be updated on a section; props are merged shallowly. */
export type SectionUpdates = {
  name?: string;
  props?: Partial<SectionComponent["props"]>;
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
 * Returns a new tree with matching sections updated. Section props are merged
 * shallowly, and an omitted name preserves the existing name. Children of a
 * matching section are not searched for further matches.
 *
 * @param nodes - Root nodes to update.
 * @param id - ID of the section to update.
 * @param updates - Section fields to apply.
 * @returns A new array containing the updated tree.
 */
export const updateSectionInTree = (
  nodes: ComponentNode[],
  id: string,
  updates: SectionUpdates,
): ComponentNode[] =>
  nodes.map((node) => {
    if (node.type !== "section") return node;
    if (node.id === id) {
      return {
        ...node,
        name: updates.name ?? node.name,
        props: { ...node.props, ...updates.props },
      };
    }
    return {
      ...node,
      children: updateSectionInTree(node.children, id, updates),
    };
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
