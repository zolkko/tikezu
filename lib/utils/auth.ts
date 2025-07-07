import { compare, genSalt, hash } from "bcrypt";
import { UserService } from "$lib/services/user.ts";
import { User } from "$lib/types/user.ts";

export class PasswordUtils {
  private static readonly SALT_ROUNDS = 10;

  static async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.SALT_ROUNDS);
    return await hash(password, salt);
  }

  static async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await compare(password, hash);
  }
}

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
