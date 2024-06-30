import { getCookieValue } from "@/utils/cookie_get";

export function getToken() {
  const token = getCookieValue("Authorization");
  if (token === null) {
    throw new Error("No token");
  }

  return token;
}
