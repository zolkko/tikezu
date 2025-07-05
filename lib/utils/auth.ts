import { UserService } from "$lib/services/user.ts";
import { User } from "$lib/types/user.ts";

export async function authenticateUser(
  username: string,
  password: string,
): Promise<User | null> {
  const users = await UserService.create();
  return users.find(username, password);
}

export function generateChallenge(): Uint8Array {
  const challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);
  return challenge;
}
