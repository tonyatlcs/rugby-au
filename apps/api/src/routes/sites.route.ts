import {
  listSitesController,
  ListSitesRouteOptions,
} from "@/controllers/list-sites/list-sites.controller";
import type { FastifyInstance } from "fastify";

export const siteRoutes = (fastify: FastifyInstance) => {
  fastify.get("/", ListSitesRouteOptions, listSitesController);
  return Promise.resolve();
};

export default async function (fastify: FastifyInstance) {
  await fastify.register(siteRoutes, { prefix: "/sites" });
}
