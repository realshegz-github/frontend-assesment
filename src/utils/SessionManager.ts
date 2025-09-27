import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  exp: number;
  iat: number;
  sub: string;
  email?: string;
}

// Decode JWT safely
export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode(token) as DecodedToken;
  } catch {
    return null;
  }
}

// Check if token expired
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  return decoded.exp * 1000 < Date.now();
}

// Schedule token refresh
export function scheduleTokenRefresh(token: string, refreshFn: () => void) {
  const decoded = decodeToken(token);
  if (!decoded) return;

  const expiresIn = decoded.exp * 1000 - Date.now() - 30000; // refresh 30s before expiry
  if (expiresIn > 0) {
    setTimeout(refreshFn, expiresIn);
  }
}
