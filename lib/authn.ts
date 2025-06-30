import { decode, encode } from "std/encoding/base64.ts";

const users: Record<string, any> = {};

export function generateRegistrationOptions(userId: string) {
  const challenge = crypto.randomUUID(); // Generate random challenge

  users[userId] = {
    credentials: [], // Save WebAuthn credentials for the user
    challenge: challenge,
  };

  return {
    challenge: encode(new TextEncoder().encode(challenge)), // Send to the frontend
    rp: {
      name: "Karwall",
      id: "blumenplace.bio",
    },
    user: {
      id: encode(new TextEncoder().encode(userId)), // User ID as base64
      name: userId,
      displayName: userId,
    },
    pubKeyCredParams: [{ type: "public-key", alg: -7 }], // Algorithm
    authenticatorSelection: {
      authenticatorAttachment: "platform", // Use device-specific methods (like Face ID or Touch ID)
      userVerification: "required", // Require Face ID/Touch ID
    },
    timeout: 60000, // Timeout duration
  };
}

export function verifyResponse(response: any, userId: string) {
  const user = users[userId];

  if (!user || user.challenge !== response.challenge) {
    throw new Error("Challenge mismatch or unknown user");
  }

  // Verify the signature and response from the client
  // This will require parsing the public key credential

  // Save the credential in the user's record
  user.credentials.push(response); // You can decide how to store it
}
