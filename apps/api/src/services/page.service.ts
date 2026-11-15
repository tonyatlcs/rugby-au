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

const lookupSite: PipelineStage.Lookup = {
  $lookup: {
    from: Site.collection.name,
    localField: "siteId",
    foreignField: "_id",
    as: "site",
  },
};

const unwindSite: PipelineStage.Unwind = { $unwind: "$site" };

const countSitePages: PipelineStage.Lookup = {
  $lookup: {
    from: Page.collection.name,
    localField: "siteId",
    foreignField: "siteId",
    pipeline: [{ $count: "total" }],
    as: "pageCounts",
  },
};

const findPageWithSite = async (matchPage: PipelineStage.Match) => {
  const [response] = await Page.aggregate<PageWithSite>([
    matchPage,
    lookupSite,
    unwindSite,
    countSitePages,
  ]).exec();
  return response;
};

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
   * Retrieves a page by ID.
   *
   * @param param - The ID of the page to retrieve.
   * @returns The transformed page, or undefined if it does not exist.
   * @throws Rethrows query or mapping errors after logging them.
   */
  retrievePage: (
    param: RetrievePageParam,
  ) => Promise<RetrievePageResponse | undefined>;

  retrievePageByPath: (
    args: RetrievePageByPathParam & RetrievePageByPathQuery,
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
      const matchPage: PipelineStage.Match = { $match: { _id: param.pageId } };
      const response = await findPageWithSite(matchPage);
      const page = response
        ? transformRetrievePageResponse(response)
        : undefined;

      return page;
    } catch (error) {
      logger.error({ error }, "Failed to retrieve page");
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

  const retrievePageByPath: PageServiceType["retrievePageByPath"] = async ({
    siteKey,
    path,
  }) => {
    try {
      const site = await Site.findOne({ siteKey }).select("_id").lean().exec();
      if (!site) return undefined;

      const matchPage: PipelineStage.Match = {
        $match: { siteId: site._id, path },
      };
      const response = await findPageWithSite(matchPage);
      return response ? transformRetrievePageResponse(response) : undefined;
    } catch (error) {
      logger.error({ error, siteKey, path }, "Failed to retrieve page by path");
      throw error;
    }
  };

  return { createPage, retrievePage, retrievePageByPath, updatePageComponent };
};
