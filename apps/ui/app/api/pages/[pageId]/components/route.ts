import { backendFetch } from "@/lib/server/backend-fetch";
import type { UpdatePageComponentsRequest } from "@rugby-au/contracts";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  let body: UpdatePageComponentsRequest;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { pageId } = await params;

  try {
    const response = await backendFetch(
      `/pages/${encodeURIComponent(pageId)}/components`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

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
