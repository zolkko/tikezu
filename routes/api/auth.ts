import { authenticateUser } from "../../../utils/auth.ts";
import { createToken } from "../../lib/jwt.ts";

export async function handler(
  req: Request,
): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { username, password } = body;

    const user = authenticateUser(username, password);
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const token = await createToken(user.username);

    return new Response(
      JSON.stringify({ token }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("failed to authenticate user: ", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
