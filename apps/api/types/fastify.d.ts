import "fastify";
import type { FastifySchema } from "fastify";

declare global {
  type RouteSchema = FastifySchema & {
    description?: string;
    tags?: string[];
  };
}
