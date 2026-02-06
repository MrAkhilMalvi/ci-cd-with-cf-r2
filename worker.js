export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let key = url.pathname.slice(1);

    if (!key || key.endsWith("/")) key = "index.html";

    let object = await env.FRONTEND_BUCKET.get(key);

    // SPA fallback
    if (!object) {
      object = await env.FRONTEND_BUCKET.get("index.html");
      if (!object) return new Response("Not Found", { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "Content-Type":
          object.httpMetadata?.contentType || "text/html",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
};
