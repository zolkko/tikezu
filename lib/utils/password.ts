import { compare, genSalt, hash } from "bcrypt";

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
