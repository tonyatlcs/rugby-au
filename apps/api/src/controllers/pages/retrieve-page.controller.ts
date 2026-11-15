import type { FastifyReply, FastifyRequest } from "fastify";
import {
  RetrievePageParamSchema,
  RetrievePageResponseSchema,
  type RetrievePageParam,
  type RetrievePageResponse,
} from "@rugby-au/contracts";
import { createPageService } from "@/services/page.service";
import createHttpError from "http-errors";

export const RetrievePageSchema: RouteSchema = {
  description: "Create a page for a site.",
  tags: ["pages"],
  params: RetrievePageParamSchema,
  response: {
    200: RetrievePageResponseSchema,
  },
};

export const RetrievePageRouteOptions = {
  schema: RetrievePageSchema,
};

export const retrievePageController = async (
  request: FastifyRequest<{
    Params: RetrievePageParam;
    Reply: RetrievePageResponse;
  }>,
  reply: FastifyReply<{
    Reply: RetrievePageResponse;
  }>,
) => {
  const pageService = createPageService(request.log);
  const response = await pageService.retrievePage(request.params);

  if (!response) {
    const message = "Failed to retrieve page";
    request.log.error(message);
    throw createHttpError.NotFound(message);
  }

  return reply.status(200).send(response);
};
