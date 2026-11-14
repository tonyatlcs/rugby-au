import type {
  PageInformation,
  PageTree,
  PageTreeNode,
} from "@/lib/server/schemas/page.schema";

/**
 * Builds a tree of pages, with each page's children nested beneath it.
 * Pages at the same level are sorted by their display order.
 *
 * @param pageInformation - The site's flat list of pages.
 * @returns The top-level pages and their nested children, or an empty array.
 */
export const buildPageTree = (pageInformation: PageInformation[]): PageTree => {
  const getChildren = (parentId: string): PageTreeNode[] => {
    // Find the pages directly under this parent.
    const children = pageInformation.filter(
      (page) => page.parentId === parentId,
    );

    // This parent has no children, so stop here.
    if (children.length === 0) {
      return [];
    }

    // Put them in their display order.
    children.sort((a, b) => a.order - b.order);

    return children.map((page) => {
      return {
        name: page.title,
        attributes: page,
        children: getChildren(page.id),
      };
    });
  };

  // Start with the top-level pages, which have no parent.
  return getChildren("");
};
