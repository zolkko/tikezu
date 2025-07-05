import { Handlers } from "$fresh/server.ts";
import { generateChallenge } from "../../../lib/utils/auth.ts";
import { encodeBase64 } from "$std/encoding/base64.ts";

export const handler: Handlers = {
  GET(_req: Request) {
    try {
      const challenge = generateChallenge();
      const challengeBase64 = encodeBase64(challenge);

      return new Response(
        JSON.stringify({
          challenge: Array.from(challenge),
          timestamp: Date.now(),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie":
              `auth-challenge=${challengeBase64}; HttpOnly; Path=/; SameSite=Strict; Secure`,
          },
        },
      );
    } catch (error) {
      console.error("Failed to generate challenge:", error);

      return new Response(
        JSON.stringify({
          error: "Failed to generate challenge",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
