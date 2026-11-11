import {
  healthController,
  HealthRouteOptions,
} from "@/controllers/health/health.controller";
import type { FastifyInstance } from "fastify";

export const healthRoutes = (fastify: FastifyInstance) => {
  fastify.get("/", HealthRouteOptions, healthController);
  return Promise.resolve();
};

export default async function (fastify: FastifyInstance) {
  await fastify.register(healthRoutes, { prefix: "/health" });
}
