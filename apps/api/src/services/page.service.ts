import type {
  CreatePageRequest,
  CreatePageResponse,
  RetrievePageParam,
  RetrievePageResponse,
} from "@rugby-au/contracts";
import type { FastifyBaseLogger } from "fastify";
import { Page, Site } from "@/models/model";
import {
  transformRetrievePageResponse,
  type PageWithSite,
} from "@/dto/transform-retrieve-page-response.dto";

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

  /**
   * Retrieves a page by ID.
   *
   * @param param - The ID of the page to retrieve.
   * @returns The transformed page, or undefined if it does not exist.
   * @throws Rethrows query or mapping errors after logging them.
   */
  retrievePage: (
    param: RetrievePageParam,
  ) => Promise<RetrievePageResponse | undefined>;
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

  const retrievePage: PageServiceType["retrievePage"] = async (param) => {
    try {
      const [response] = await Page.aggregate<PageWithSite>([
        { $match: { _id: param.pageId } },
        {
          $lookup: {
            from: Site.collection.name,
            localField: "siteId",
            foreignField: "_id",
            as: "site",
          },
        },
        { $unwind: "$site" },
        {
          $lookup: {
            from: Page.collection.name,
            localField: "siteId",
            foreignField: "siteId",
            pipeline: [{ $count: "total" }],
            as: "pageCounts",
          },
        },
      ]).exec();
      const page = response
        ? transformRetrievePageResponse(response)
        : undefined;

      return page;
    } catch (error) {
      logger.error({ error }, "Failed to retrieve page");
      throw error;
    }
  };

  return { createPage, retrievePage };
};
