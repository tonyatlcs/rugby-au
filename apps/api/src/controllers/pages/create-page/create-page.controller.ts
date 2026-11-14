import type { FastifyReply, FastifyRequest } from "fastify";
import {
  CreatePageRequestSchema,
  CreatePageResponseSchema,
  type CreatePageRequest,
  type CreatePageResponse,
} from "@rugby-au/contracts";
import { createPageService } from "@/services/page/page.service";
import createHttpError from "http-errors";

export const CreatePageSchema: RouteSchema = {
  description: "Create a page for a site.",
  tags: ["pages"],
  body: CreatePageRequestSchema,
  response: {
    201: CreatePageResponseSchema,
  },
};

export const CreatePageRouteOptions = {
  schema: CreatePageSchema,
};

export const createPageController = async (
  request: FastifyRequest<{
    Body: CreatePageRequest;
    Reply: CreatePageResponse;
  }>,
  reply: FastifyReply<{
    Reply: CreatePageResponse;
  }>,
) => {
  const pageService = createPageService(request.log);
  const response = await pageService.createPage(request.body);

  if (!response) {
    const message = "Failed to create page";
    request.log.error(message);
    throw createHttpError.InternalServerError(message);
  }

  return reply.status(201).send(response);
};
