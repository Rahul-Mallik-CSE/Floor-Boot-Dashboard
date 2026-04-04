/** @format */

const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const buildCookie = (name: string, value: string, maxAge: number) => {
  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";

  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
  ];

  if (isHttps) {
    parts.push("Secure");
  }

  return parts.join("; ");
};

export const setAuthCookies = (token: string, verified?: boolean): void => {
  document.cookie = buildCookie("token", token, AUTH_COOKIE_MAX_AGE);

  if (verified !== undefined) {
    document.cookie = buildCookie(
      "verified",
      verified.toString(),
      AUTH_COOKIE_MAX_AGE,
    );
  }
};

export const clearAuthCookies = (): void => {
  document.cookie = buildCookie("token", "", 0);
  document.cookie = buildCookie("verified", "", 0);
};