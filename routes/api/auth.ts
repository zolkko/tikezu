import { authenticateUser } from "$lib/utils/auth.ts";
import { createToken } from "$lib/utils/jwt.ts";

export async function handler(
  req: Request,
): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
    });
  }

  try {
    const body = await req.json();
    const { username, password } = body;
    const user = await authenticateUser(username, password);
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const token = await createToken(user.name);

    return new Response(
      JSON.stringify({ token }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie":
            `auth-token=${token}; HttpOnly; Path=/; SameSite=Strict; Secure`,
        },
      },
    );
  } catch (error) {
    console.error("Failed to authenticate user:", error);

    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
