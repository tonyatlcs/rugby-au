import type {
  CreatePageRequest,
  CreatePageResponse,
  RetrievePageParam,
  RetrievePageResponse,
  RetrievePageByPathParam,
  RetrievePageByPathQuery,
  UpdatePageComponentsParam,
  UpdatePageComponentsRequest,
  UpdatePageComponentsResponse,
  ComponentNode as ApiComponentNode,
} from "@rugby-au/contracts";
import type { FastifyBaseLogger } from "fastify";
import type { PipelineStage } from "mongoose";
import { Page, Site } from "@/models/model";
import type { ComponentNode as StoredComponent } from "@/models/page.model";
import {
  transformRetrievePageResponse,
  type PageWithSite,
} from "@/dto/transform-retrieve-page-response.dto";

const toStoredComponent = (component: ApiComponentNode): StoredComponent => {
  if (component.type === "section") {
    return {
      _id: component.id,
      name: component.name,
      type: component.type,
      props: component.props,
      children: component.children.map(toStoredComponent),
    };
  }
  return {
    _id: component.id,
    name: component.name,
    type: component.type,
    props: component.props,
    children: component.children,
  };
};

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
   * Retrieves a page by ID or by site key and path.
   *
   * @param param - The page ID or the site key and path.
   * @returns The transformed page, or undefined if it does not exist.
   * @throws Rethrows query or mapping errors after logging them.
   */
  retrievePage: (
    param:
      RetrievePageParam | (RetrievePageByPathParam & RetrievePageByPathQuery),
  ) => Promise<RetrievePageResponse | undefined>;

  /**
   * Replaces the component tree for a page, validating the update.
   *
   * @param args - The page ID and replacement component tree.
   * @returns A confirmation message, or undefined if the page does not exist.
   * @throws Rethrows database or validation errors after logging them.
   */
  updatePageComponent: (args: {
    params: UpdatePageComponentsParam;
    body: UpdatePageComponentsRequest;
  }) => Promise<UpdatePageComponentsResponse | undefined>;
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
      const match: Record<string, unknown> = {};
      const siteMatch: Record<string, unknown> = {};

      if ("pageId" in param) {
        match._id = param.pageId;
      } else {
        match.path = param.path;
        siteMatch["site.siteKey"] = param.siteKey;
      }

      const matchPage: PipelineStage.Match = { $match: match };
      const lookupSite: PipelineStage.Lookup = {
        $lookup: {
          from: Site.collection.name,
          localField: "siteId",
          foreignField: "_id",
          as: "site",
        },
      };
      const unwindSite: PipelineStage.Unwind = { $unwind: "$site" };
      const matchSite: PipelineStage.Match = { $match: siteMatch };
      const countSitePages: PipelineStage.Lookup = {
        $lookup: {
          from: Page.collection.name,
          localField: "siteId",
          foreignField: "siteId",
          pipeline: [{ $count: "total" }],
          as: "pageCounts",
        },
      };

      const [response] = await Page.aggregate<PageWithSite>([
        matchPage,
        lookupSite,
        unwindSite,
        matchSite,
        countSitePages,
      ]).exec();
      if (!response) return undefined;
      return transformRetrievePageResponse(response);
    } catch (error) {
      logger.error({ error, ...param }, "Failed to retrieve page");
      throw error;
    }
  };

  const updatePageComponent: PageServiceType["updatePageComponent"] = async (
    args,
  ) => {
    try {
      const page = await Page.findByIdAndUpdate(
        args.params.pageId,
        { $set: { components: args.body.components.map(toStoredComponent) } },
        { new: true, runValidators: true },
      ).exec();

      if (!page) return undefined;

      return { message: "Components successfully saved!" };
    } catch (error) {
      logger.error({ error }, "Failed to save components");
      throw error;
    }
  };

  return { createPage, retrievePage, updatePageComponent };
};
