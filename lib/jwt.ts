import {
  create,
  Payload,
  verify,
} from "https://deno.land/x/djwt@v3.0.2/mod.ts";

interface JWTPayload {
  username: string;
  role: string;
  exp: number;
}

const JWT_CRYPTO_KEY = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export async function createToken(username: string): Promise<string> {
  const payload: Payload = {
    username,
    exp: Date.now() + 24 * 60 * 60 * 1000,
  };
  return await create({ alg: "HS256", typ: "JWT" }, payload, JWT_CRYPTO_KEY);
}
