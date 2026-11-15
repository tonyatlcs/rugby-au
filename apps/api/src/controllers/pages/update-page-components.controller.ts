import type { FastifyReply, FastifyRequest } from "fastify";
import {
  UpdatePageComponentsParamSchema,
  UpdatePageComponentsRequestSchema,
  UpdatePageComponentsResponseSchema,
  type UpdatePageComponentsParam,
  type UpdatePageComponentsRequest,
  type UpdatePageComponentsResponse,
} from "@rugby-au/contracts";
import { createPageService } from "@/services/page.service";
import createHttpError from "http-errors";

export const UpdatePageComponentsSchema: RouteSchema = {
  description: "Update the component tree for a page.",
  tags: ["pages"],
  params: UpdatePageComponentsParamSchema,
  body: UpdatePageComponentsRequestSchema,
  response: {
    200: UpdatePageComponentsResponseSchema,
  },
};

export const UpdatePageComponentsRouteOptions = {
  schema: UpdatePageComponentsSchema,
};

export const updatePageComponentsController = async (
  request: FastifyRequest<{
    Params: UpdatePageComponentsParam;
    Body: UpdatePageComponentsRequest;
    Reply: UpdatePageComponentsResponse;
  }>,
  reply: FastifyReply<{
    Reply: UpdatePageComponentsResponse;
  }>,
) => {
  const pageService = createPageService(request.log);
  const response = await pageService.updatePageComponent({
    params: request.params,
    body: request.body,
  });

  if (!response) {
    const message = "Page not found";
    request.log.error(message);
    throw createHttpError.NotFound(message);
  }

  return reply.status(200).send(response);
};
