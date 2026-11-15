import {
  createPageController,
  CreatePageRouteOptions,
} from "@/controllers/pages/create-page.controller";
import {
  retrievePageController,
  RetrievePageRouteOptions,
} from "@/controllers/pages/retrieve-page.controller";
import {
  updatePageComponentsController,
  UpdatePageComponentsRouteOptions,
} from "@/controllers/pages/update-page-components.controller";
import type { FastifyInstance } from "fastify";

export const pageRoutes = (fastify: FastifyInstance) => {
  fastify.post("/", CreatePageRouteOptions, createPageController);
  fastify.get("/:pageId", RetrievePageRouteOptions, retrievePageController);
  fastify.patch(
    "/:pageId/components",
    UpdatePageComponentsRouteOptions,
    updatePageComponentsController,
  );
};

export default async function (fastify: FastifyInstance) {
  await fastify.register(pageRoutes, { prefix: "/pages" });
}
