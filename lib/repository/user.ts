import { connect, Redis } from "redis";
import { User } from "$lib/types/user.ts";
import { config } from "$lib/config.ts";

export interface UserRepository {
  create(user: User): Promise<void>;
  findByName(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

export class RedisUserRepository implements UserRepository {
  constructor(private redis: Redis) {}

  public static async create(): Promise<UserRepository> {
    console.log("REDIS CONFIGURATION:", config.redis);
    const redis = await connect(config.redis);
    return new RedisUserRepository(redis);
  }

  async create(user: User): Promise<void> {
    await this.redis.set(`user:${user.name}`, JSON.stringify(user));
  }

  async findByName(name: string): Promise<User | null> {
    const userJson = await this.redis.get(`user:${name}`);
    return userJson ? JSON.parse(userJson) : null;
  }

  async findAll(): Promise<User[]> {
    const keys = await this.redis.keys("user:*");
    const users: User[] = [];

    for (const key of keys) {
      const userJson = await this.redis.get(key);
      if (userJson) {
        users.push(JSON.parse(userJson));
      }
    }

    return users;
  }

  async update(user: User): Promise<void> {
    await this.create(user);
  }

  async delete(name: string): Promise<void> {
    await this.redis.del(`user:${name}`);
  }
}
