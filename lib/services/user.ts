import { User } from "$lib/types/user.ts";
import { RedisUserRepository, UserRepository } from "$lib/repository/user.ts";
import { PasswordUtils } from "../utils/auth.ts";

export class UserService {
  constructor(private userRepository: UserRepository) {
  }

  public static async create(): Promise<UserService> {
    const repo = await RedisUserRepository.create();
    return new UserService(repo);
  }

  async find(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByName(username);
    if (!user) {
      return null;
    }
    const isPasswordValid = await PasswordUtils.verifyPassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  async createUser(user: User): Promise<void> {
    if (!user.name || !user.password) {
      throw new Error("Invalid user data");
    }

    const hashedPassword = await PasswordUtils.hashPassword(user.password);
    const userWithHashedPassword = { ...user, password: hashedPassword };
    await this.userRepository.create(userWithHashedPassword);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findByName(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async updateUser(user: User): Promise<void> {
    const existingUser = await this.getUserById(user.name);
    if (!existingUser) {
      throw new Error("User not found");
    }
    await this.userRepository.update(user);
  }

  async deleteUser(id: string): Promise<void> {
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    await this.userRepository.delete(id);
  }
}
