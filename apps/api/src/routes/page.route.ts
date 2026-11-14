import {
  createPageController,
  CreatePageRouteOptions,
} from "@/controllers/pages/create-page/create-page.controller";
import type { FastifyInstance } from "fastify";

export const pageRoutes = (fastify: FastifyInstance) => {
  fastify.post("/", CreatePageRouteOptions, createPageController);
};

export default async function (fastify: FastifyInstance) {
  await fastify.register(pageRoutes, { prefix: "/pages" });
}
