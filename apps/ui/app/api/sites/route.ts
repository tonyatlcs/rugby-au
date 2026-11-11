import { listSites } from "@/lib/server/sites/list-sites/list-sites";
import createHttpError from "http-errors";

export async function GET() {
  try {
    return Response.json(await listSites());
  } catch (error) {
    if (createHttpError.isHttpError(error) && "body" in error) {
      return Response.json(error.body, {
        status: error.statusCode,
      });
    }

    throw error;
  }
}
