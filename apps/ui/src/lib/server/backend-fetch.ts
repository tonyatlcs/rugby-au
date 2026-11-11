import "server-only";
import { SECOND } from "@/lib/constants/time";

const DEFAULT_BACKEND_TIMEOUT_MS = 10 * SECOND;

export function backendFetch(
  path: string,
  options?: RequestInit,
): Promise<Response> {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_URL is not configured");
  }

  return fetch(new URL(path, backendUrl), {
    cache: "no-store",
    signal: AbortSignal.timeout(DEFAULT_BACKEND_TIMEOUT_MS),
    ...options,
  });
}
