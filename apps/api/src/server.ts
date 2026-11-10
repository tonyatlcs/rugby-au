import { buildApp } from "@/app";

const server = buildApp({ logger: true });

try {
  await server.listen({ port: 3001 });
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
