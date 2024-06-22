import { PlayType } from "@/features/play";
import { getCookieValue } from "@/utils/cookie_get";

export async function GoPlayLoad(count: number, lang: string) {
  const token = getCookieValue("Authorization");
  if (token === null) {
    throw new Error("No token");
  }

  const req = await fetch(`/api/v1/play?count=${count}&lang=${lang}`, {
    headers: {
      Authorization: token,
    },
  });

  if (!req.ok) throw new Error("Bad request");

  const data: PlayType = await req.json();
  return data;
}
