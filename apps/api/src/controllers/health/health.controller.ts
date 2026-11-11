import { HealthResponseSchema, type HealthResponse } from "@rugby-au/contracts";
import type {
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from "fastify";

export const HealthRouteOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: HealthResponseSchema,
    },
  },
};

export function healthController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.send({ status: "ok" } satisfies HealthResponse);
}
