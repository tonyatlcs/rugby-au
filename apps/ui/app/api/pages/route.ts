import { backendFetch } from "@/lib/server/backend-fetch";
import { CreatePageRequest } from "@rugby-au/contracts";

export async function POST(request: Request) {
  const body: CreatePageRequest = await request.json();

  try {
    const response = await backendFetch("/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch {
    return Response.json(
      { message: "Unable to reach the page service" },
      { status: 502 },
    );
  }
}
