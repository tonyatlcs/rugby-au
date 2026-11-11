import type { ListSitesItem, ListSitesResponse } from "@rugby-au/contracts";
import type { FastifyBaseLogger } from "fastify";
import type { PipelineStage } from "mongoose";
import { Page, Site } from "@/models/model";

/** Operation signatures for retrieving site data for API responses. */
export type SiteServiceType = {
  /**
   * Retrieves all sites with page counts in one database aggregation.
   *
   * @returns Sites with `_id` mapped to `id`, missing descriptions set to an
   * empty string, and zero counts for sites without pages.
   * @throws Rethrows query or mapping errors after logging them.
   */
  listSites: () => Promise<ListSitesResponse>;
};

/**
 * Creates the site service with the supplied logger.
 *
 * @param logger - Logger used to record failures before they are rethrown.
 * @returns The site service operations.
 */
export const createSiteService = (
  logger: FastifyBaseLogger,
): SiteServiceType => {
  const listSites: SiteServiceType["listSites"] = async () => {
    try {
      // Counts the "siteId" in "pages" collection that matches the current site's _id.
      const countPagesForEachSite: PipelineStage.Lookup = {
        $lookup: {
          from: Page.collection.name,
          localField: "_id",
          foreignField: "siteId",
          pipeline: [{ $count: "total" }],
          as: "pageCounts",
        },
      };

      const pageCountOrZero = {
        $ifNull: [{ $arrayElemAt: ["$pageCounts.total", 0] }, 0],
      };

      return await Site.aggregate<ListSitesItem>([countPagesForEachSite])
        .addFields({
          id: "$_id",
          description: { $ifNull: ["$description", ""] },
          status: { $ifNull: ["$status", "draft"] },
          pageCount: pageCountOrZero,
        })
        .project("id name siteKey description theme status pageCount -_id")
        .exec();
    } catch (error) {
      logger.error({ error }, "Failed to list sites");
      throw error;
    }
  };

  return {
    listSites,
  };
};
