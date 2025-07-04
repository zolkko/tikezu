export interface User {
  username: string;
}

interface UserRecord {
  username: string;
  password: string;
}

const USERS: UserRecord[] = [
  {
    username: "user",
    password: "user123",
  },
];

export function authenticateUser(
  username: string,
  password: string,
): User | undefined {
  const user = USERS.find((user) =>
    user.username === username && user.password === password
  );
  if (!user) return;

  return {
    username: user.username,
  };
}

export function generateChallenge(): Uint8Array {
  const challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);
  return challenge;
}
