export const ACCESS_TOKEN_COOKIE = "nest_access_token";

export type AuthenticatedUser = {
  id: string;
  email?: string | null;
  [key: string]: unknown;
};

export type LoginResponse = {
  access_token: string;
  expires_in: number;
  user: AuthenticatedUser;
};

export function getAccessToken() {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${ACCESS_TOKEN_COOKIE}=`));

  return cookie
    ? decodeURIComponent(cookie.slice(ACCESS_TOKEN_COOKIE.length + 1))
    : null;
}

export function setAccessToken(token: string, expiresIn: number) {
  const secure = window.location.protocol === "https:" ? "Secure" : "";
  document.cookie = [
    `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${Math.max(0, expiresIn)}`,
    "SameSite=Lax",
    secure,
  ]
    .filter(Boolean)
    .join("; ");
}

export function clearAccessToken() {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
