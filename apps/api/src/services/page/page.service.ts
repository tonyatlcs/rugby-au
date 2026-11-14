import type {
  CreatePageRequest,
  CreatePageResponse,
} from "@rugby-au/contracts";
import type { FastifyBaseLogger } from "fastify";
import { Page } from "@/models/model";

/** Operation signatures for managing pages. */
export type PageServiceType = {
  /**
   * Creates a page belonging to the given site.
   *
   * @param request - The site ID, title, path, and optional parent page ID.
   * @returns A message confirming that the page was created.
   * @throws Rethrows database errors after logging them.
   */
  createPage: (request: CreatePageRequest) => Promise<CreatePageResponse>;
};

/**
 * Creates the page service with the supplied logger.
 *
 * @param logger - Logger used to record failures before they are rethrown.
 * @returns The page service operations.
 */
export const createPageService = (
  logger: FastifyBaseLogger,
): PageServiceType => {
  const createPage: PageServiceType["createPage"] = async (request) => {
    try {
      await Page.create({
        ...request,
      });

      return { message: "Successfully created page" };
    } catch (error) {
      logger.error({ error }, "Failed to create page");
      throw error;
    }
  };

  return { createPage };
};
