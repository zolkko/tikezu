import { UserService } from "$lib/services/user.ts";
import { User } from "$lib/types/user.ts";

const mockUsers: User[] = [
  {
    name: "user1",
    password: "password123",
    createdAt: new Date().toISOString(),
  },
  {
    name: "user2",
    password: "password234",
    createdAt: new Date().toISOString(),
  },
];

async function populateUsers() {
  console.log("Starting to populate users...");

  const userService = await UserService.create();

  for (const user of mockUsers) {
    try {
      await userService.createUser(user);
      console.log(`Created user: ${user.name}`);
    } catch (error) {
      console.error(`Error creating user ${user.name}:`, error);
    }
  }

  console.log("Finished populating users");

  Deno.exit(0);
}

populateUsers();
