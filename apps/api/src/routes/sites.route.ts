import {
  listSitesController,
  ListSitesRouteOptions,
} from "@/controllers/sites/list-sites.controller";
import {
  retireveSiteController,
  RetrieveSiteRouteOptions,
} from "@/controllers/sites/retrieve-site.controller";
import type { FastifyInstance } from "fastify";
import {
  retrievePageByPathController,
  RetrievePageByPathRouteOptions,
} from "@/controllers/pages/retrieve-page-by-path.controller";

export const siteRoutes = (fastify: FastifyInstance) => {
  fastify.get("/", ListSitesRouteOptions, listSitesController);
  fastify.get("/:siteId", RetrieveSiteRouteOptions, retireveSiteController);
  fastify.get(
    "/:siteKey/page",
    RetrievePageByPathRouteOptions,
    retrievePageByPathController,
  );
};

export default async function (fastify: FastifyInstance) {
  await fastify.register(siteRoutes, { prefix: "/sites" });
}
