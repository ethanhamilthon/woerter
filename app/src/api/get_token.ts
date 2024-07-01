import { getCookieValue } from "@/utils/cookie";

export function getToken() {
  const token = getCookieValue("Authorization");
  if (token === null) {
    throw new Error("No token");
  }

  return token;
}
