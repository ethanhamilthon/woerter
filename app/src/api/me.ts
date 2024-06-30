import { getToken } from "./get_token";

export function GetMe(token: string) {
  return fetch("/api/v1/me", {
    headers: {
      Authorization: token,
    },
  });
}

export function OnboardUpdate(body: {
  os_language: string;
  target_languages: string[];
}) {
  const token = getToken();
  return fetch("/api/v1/onboard", {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
}
