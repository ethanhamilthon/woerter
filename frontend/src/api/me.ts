export function GetMe(token: string) {
  return fetch("/oauth/google/me", {
    headers: {
      Authorization: token,
    },
  });
}

export function OnboardUpdate(
  token: string,
  body: {
    os_language: string;
    target_languages: string[];
  }
) {
  return fetch("/api/v1/onboard", {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
}
