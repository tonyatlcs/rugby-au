import type {
  ListSitesItem,
  ListSitesResponse,
  RetrieveSiteParam,
  RetrieveSiteResponse,
} from "@rugby-au/contracts";
import type { FastifyBaseLogger } from "fastify";
import type { PipelineStage } from "mongoose";
import { Page, Site } from "@/models/model";
import {
  transformRetrieveSiteResponse,
  type SiteWithPages,
} from "@/controllers/sites/retrieve-site/util/transform-retrieve-site-response.dto";

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

  /**
   * Retrieves a site and its associated pages in one database aggregation.
   *
   * @param param - The ID of the site to retrieve.
   * @returns The transformed site and pages.
   * @throws Rethrows query or mapping errors after logging them.
   */
  retrieveSite: (
    param: RetrieveSiteParam,
  ) => Promise<RetrieveSiteResponse | undefined>;
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
          createdAt: {
            $dateToString: {
              date: "$createdAt",
              format: "%Y-%m-%dT%H:%M:%S.%LZ",
              timezone: "UTC",
            },
          },
          updatedAt: {
            $dateToString: {
              date: "$updatedAt",
              format: "%Y-%m-%dT%H:%M:%S.%LZ",
              timezone: "UTC",
            },
          },
        })
        .project(
          "id name siteKey description theme status pageCount createdAt updatedAt -_id",
        )
        .exec();
    } catch (error) {
      logger.error({ error }, "Failed to list sites");
      throw error;
    }
  };

  const retrieveSite: SiteServiceType["retrieveSite"] = async ({ siteId }) => {
    try {
      const lookupSitePages: PipelineStage.Lookup = {
        $lookup: {
          from: Page.collection.name,
          localField: "_id",
          foreignField: "siteId",
          as: "pages",
        },
      };

      const lookupSite: PipelineStage = {
        $match: { _id: siteId },
      };

      const [site] = await Site.aggregate<SiteWithPages>([
        lookupSite,
        lookupSitePages,
      ]).exec();

      const response = transformRetrieveSiteResponse(site || undefined);

      return response;
    } catch (error) {
      logger.error({ error, siteId }, "Failed to retrieve site");
      throw error;
    }
  };

  return {
    listSites,
    retrieveSite,
  };
};
