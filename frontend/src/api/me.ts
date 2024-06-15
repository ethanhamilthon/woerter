import { ProfileType } from "@/features/auth";

export async function GetMe(token: string) {
  const req = await fetch("/oauth/google/me", {
    headers: {
      Authorization: token,
    },
  });
  const data: ProfileType = await req.json();
  return data;
}
