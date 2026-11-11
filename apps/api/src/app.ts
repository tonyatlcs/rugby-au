import { registerDatabase } from "@/database";
import healthRoutes from "@/routes/health.route";
import sitesRoutes from "@/routes/sites.route";
import Fastify from "fastify";
import type { FastifyServerOptions } from "fastify";

export function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify(options);

  registerDatabase(app);
  app.register(healthRoutes);
  app.register(sitesRoutes);

  return app;
}
