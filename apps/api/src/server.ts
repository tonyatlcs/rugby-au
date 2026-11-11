import "dotenv/config";
import { buildApp } from "@/app";

const server = buildApp({ logger: true });

const shutdown = async () => {
  try {
    await server.close();
  } catch (error) {
    server.log.error(error);
    process.exitCode = 1;
  }
};

process.once("SIGINT", () => void shutdown());
process.once("SIGTERM", () => void shutdown());

try {
  await server.listen({ port: 3001 });
} catch (error) {
  server.log.error(error);
  process.exitCode = 1;
  await shutdown();
}
