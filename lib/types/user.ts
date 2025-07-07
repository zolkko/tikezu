export interface User {
  name: string;
  password: string;
  createdAt: string;
  // TODO: add updatedAt field
  // undefined value indicates that a user was not asked about their preferences.
  biometricEnabled?: boolean;
  biometricChallenge?: string;
}
