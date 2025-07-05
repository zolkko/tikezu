import { load } from "$std/dotenv/mod.ts";

if (Deno.env.get("DENO_ENV") !== "production") {
  await load({ export: true });
}

export interface Config {
  redis: {
    hostname: string;
    port: number;
    password?: string;
    tls?: boolean;
  };
}

export const config: Config = {
  redis: {
    hostname: Deno.env.get("REDIS_HOST") ?? "127.0.0.1",
    port: parseInt(Deno.env.get("REDIS_PORT") ?? "6379"),
    password: Deno.env.get("REDIS_PASSWORD") || undefined,
    tls: Deno.env.get("REDIS_TLS") === "true",
  },
};
