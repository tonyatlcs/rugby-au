import type { FastifyReply, FastifyRequest } from "fastify";
import {
  RetrievePageByPathParamSchema,
  RetrievePageByPathQuerySchema,
  RetrievePageResponseSchema,
  type RetrievePageByPathParam,
  type RetrievePageByPathQuery,
  type RetrievePageResponse,
} from "@rugby-au/contracts";
import { createPageService } from "@/services/page.service";
import createHttpError from "http-errors";

export const RetrievePageByPathRouteOptions = {
  schema: {
    description: "Retrieve a page by site key and path.",
    tags: ["pages"],
    params: RetrievePageByPathParamSchema,
    querystring: RetrievePageByPathQuerySchema,
    response: { 200: RetrievePageResponseSchema },
  },
};

export const retrievePageByPathController = async (
  request: FastifyRequest<{
    Params: RetrievePageByPathParam;
    Querystring: RetrievePageByPathQuery;
    Reply: RetrievePageResponse;
  }>,
  reply: FastifyReply<{ Reply: RetrievePageResponse }>,
) => {
  const response = await createPageService(request.log).retrievePage({
    ...request.params,
    ...request.query,
  });

  if (!response) throw createHttpError.NotFound("Page not found");

  return reply.status(200).send(response);
};
