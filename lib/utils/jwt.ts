import { create, Payload, verify } from "djwt";

const JWT_EXP_MILLS = 24 * 60 * 60 * 1000;

const JWT_CRYPTO_KEY = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export interface JWTPayload extends Payload {
  username: string;
  biometricEnabled: boolean;
  channenge: string;
}

export async function createToken(username: string): Promise<string> {
  const payload: JWTPayload = {
    username,
    biometricEnabled: false,
    channenge: "",
    exp: Date.now() + JWT_EXP_MILLS,
  };
  return await create({ alg: "HS512", typ: "JWT" }, payload, JWT_CRYPTO_KEY);
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  return await verify<JWTPayload>(token, JWT_CRYPTO_KEY);
}
