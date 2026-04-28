import type { User, AuthState } from "../types";

// Simple JWT-like token generator (not real crypto, just for demo)
function generateMockToken(email: string): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: email,
      iat: Date.now(),
      exp: Date.now() + 86400000, // 24 hours
    })
  );
  const signature = btoa(email + "secret-demo-key");
  return `${header}.${payload}.${signature}`;
}

function generateMockUser(email: string): User {
  const nameFromEmail = email.split("@")[0];
  const formattedName =
    nameFromEmail.charAt(0).toUpperCase() +
    nameFromEmail.slice(1).replace(/[._]/g, " ");

  return {
    id: `user-${Date.now()}`,
    email,
    name: formattedName,
    token: generateMockToken(email),
  };
}

let currentUser: User | null = null;
let currentToken: string | null = null;

export async function mockLogin(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));

  // Accept any email/password for demo
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = generateMockUser(email);
  currentUser = user;
  currentToken = user.token;

  return { user, token: user.token };
}

export async function mockLogout(): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  currentUser = null;
  currentToken = null;
}

export function getCurrentUser(): User | null {
  return currentUser;
}

export function getCurrentToken(): string | null {
  return currentToken;
}

export function isAuthenticated(): boolean {
  return currentUser !== null && currentToken !== null;
}

export function setAuthState(user: User | null, token: string | null): void {
  currentUser = user;
  currentToken = token;
}

export function getAuthState(): AuthState {
  return {
    user: currentUser,
    isAuthenticated: currentUser !== null,
    token: currentToken,
  };
}
