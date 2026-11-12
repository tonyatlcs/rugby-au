import type { FastifyReply, FastifyRequest } from "fastify";
import createHttpError from "http-errors";
import {
  RetrieveSiteParamSchema,
  RetrieveSiteResponseSchema,
  type RetrieveSiteParam,
  type RetrieveSiteResponse,
} from "@rugby-au/contracts";
import { createSiteService } from "@/services/site/site.service";

export const RetrieveSiteSchema: RouteSchema = {
  description: "Retrieve one site and it's associated pages.",
  tags: ["sites"],
  params: RetrieveSiteParamSchema,
  response: {
    200: RetrieveSiteResponseSchema,
  },
};

export const RetrieveSiteRouteOptions = {
  schema: RetrieveSiteSchema,
};

export const retireveSiteController = async (
  request: FastifyRequest<{
    Params: RetrieveSiteParam;
    Reply: RetrieveSiteResponse;
  }>,
  reply: FastifyReply<{
    Reply: RetrieveSiteResponse;
  }>,
) => {
  const siteService = createSiteService(request.log);

  const response = await siteService.retrieveSite(request.params);

  if (!response) {
    const message = "Failed to retrieve requested site information";
    request.log.error(message);
    throw createHttpError.InternalServerError(message);
  }

  return reply.status(200).send(response);
};
