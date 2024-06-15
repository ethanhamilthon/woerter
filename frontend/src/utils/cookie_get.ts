export function getCookieValue(key: string): string | null {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [cookieKey, cookieValue] = cookie.trim().split("=");

    if (cookieKey === key) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
}
