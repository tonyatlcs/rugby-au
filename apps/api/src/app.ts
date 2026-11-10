import { healthRoutes } from "@/routes/health";
import Fastify from "fastify";
import type { FastifyServerOptions } from "fastify";

export function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify(options);

  app.register(healthRoutes);

  return app;
}
