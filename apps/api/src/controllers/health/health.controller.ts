import type { FastifyReply, FastifyRequest } from "fastify";

export function healthController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.send({ status: "ok" });
}
