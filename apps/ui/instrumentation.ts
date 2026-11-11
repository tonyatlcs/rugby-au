export function register() {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_URL is not configured");
  }

  try {
    const url = new URL(backendUrl);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("Unsupported protocol");
    }
  } catch {
    throw new Error("BACKEND_URL must be a valid HTTP or HTTPS URL");
  }
}
