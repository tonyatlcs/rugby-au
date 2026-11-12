import {
  listSitesController,
  ListSitesRouteOptions,
} from "@/controllers/sites/list-sites/list-sites.controller";
import {
  retireveSiteController,
  RetrieveSiteRouteOptions,
} from "@/controllers/sites/retrieve-site/retrieve-site.controller";
import type { FastifyInstance } from "fastify";

export const siteRoutes = (fastify: FastifyInstance) => {
  fastify.get("/", ListSitesRouteOptions, listSitesController);
  fastify.get("/:siteId", RetrieveSiteRouteOptions, retireveSiteController);
};

export default async function (fastify: FastifyInstance) {
  await fastify.register(siteRoutes, { prefix: "/sites" });
}
