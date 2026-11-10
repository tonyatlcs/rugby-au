import { healthController } from "@/controllers/health/health.controller";
import type { FastifyPluginCallback } from "fastify";

export const healthRoutes: FastifyPluginCallback = (app, _options, done) => {
  app.get("/health", healthController);
  done();
};
