import { LanguageType, ProfileType } from "@/types/user";
import { getToken } from "./get_token";

export async function GetMe(token: string) {
  const data = await fetch("/api/v1/me", {
    headers: {
      Authorization: token,
    },
  });
  const user: {
    user: ProfileType;
    languages: LanguageType[];
  } = await data.json();
  return user;
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
