import type { FastifyReply, FastifyRequest } from "fastify";
import createHttpError from "http-errors";

import {
  ListSitesResponseSchema,
  type ListSitesResponse,
} from "@rugby-au/contracts";
import { createSiteService } from "@/services/site/site.service";

export const ListSiteSchema: RouteSchema = {
  description: "List all sites with their page counts",
  tags: ["sites"],
  response: {
    200: ListSitesResponseSchema,
  },
};

export const ListSitesRouteOptions = {
  schema: ListSiteSchema,
};

export const listSitesController = async (
  request: FastifyRequest<{
    Reply: ListSitesResponse;
  }>,
  reply: FastifyReply<{
    Reply: ListSitesResponse;
  }>,
) => {
  const siteService = createSiteService(request.log);

  const response = await siteService.listSites();

  if (!response) {
    const message = "Failed to list all sites.";
    request.log.error(message);
    throw createHttpError.InternalServerError(message);
  }

  return reply.status(200).send(response);
};
