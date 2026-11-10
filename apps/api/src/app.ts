import Fastify from "fastify";
import type { FastifyServerOptions } from "fastify";

export function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify(options);

  app.get("/health", (_request, reply) => {
    return reply.send({ status: "ok" });
  });

  return app;
}
