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

export function deleteCookie(key: string): void {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
