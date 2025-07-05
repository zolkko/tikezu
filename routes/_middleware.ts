import { FreshContext } from "$fresh/server.ts";
import { verifyToken } from "$lib/utils/jwt.ts";

interface State {
  username?: string;
}

function tryAuthFromCookies(req: Request): string | undefined {
  const cookies = req.headers.get("cookie");
  const tokenMatch = cookies?.match(/auth-token=([^;]+)/);
  return tokenMatch?.[1];
}

function tryAuthFromBearer(req: Request): string | undefined {
  const authHeader = req.headers.get("Authorization");
  const bearerMatch = authHeader?.match(/^Bearer (.+)$/);
  return bearerMatch?.[1];
}

export async function handler(req: Request, ctx: FreshContext<State>) {
  if (ctx.destination !== "route") {
    return await ctx.next();
  }

  const publicRoutes = ["/signin", "/signup", "/api/auth"];

  if (publicRoutes.includes(ctx.route)) {
    return await ctx.next();
  }

  try {
    const token = tryAuthFromCookies(req) || tryAuthFromBearer(req);

    if (!token) {
      if (ctx.route.startsWith("/api")) {
        return new Response(
          JSON.stringify({
            error: "Unauthorized",
            message: "Authentication required",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      } else {
        const url = new URL(req.url);
        url.pathname = "/signin";
        return Response.redirect(url, 302);
      }
    }

    const payload = await verifyToken(token);
    ctx.state.username = payload.username;

    return await ctx.next();
  } catch (err) {
    console.log("Authentication failure:", err);

    if (ctx.route.startsWith("/api")) {
      return new Response(JSON.stringify({ error: "Authentication failed " }), {
        status: 401,
      });
    } else {
      const url = new URL(req.url);
      url.pathname = "/signin";
      return Response.redirect(url, 302);
    }
  }
}
