import {
  createPageController,
  CreatePageRouteOptions,
} from "@/controllers/pages/create-page.controller";
import {
  retrievePageController,
  RetrievePageRouteOptions,
} from "@/controllers/pages/retrieve-page.controller";
import type { FastifyInstance } from "fastify";

export const pageRoutes = (fastify: FastifyInstance) => {
  fastify.post("/", CreatePageRouteOptions, createPageController);
  fastify.get("/:pageId", RetrievePageRouteOptions, retrievePageController);
};

export default async function (fastify: FastifyInstance) {
  await fastify.register(pageRoutes, { prefix: "/pages" });
}
