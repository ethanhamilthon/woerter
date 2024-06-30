import { PlayType } from "@/features/play";
import { getToken } from "./get_token";

export async function GoPlayLoad(count: number, lang: string) {
  const token = getToken();

  const req = await fetch(`/api/v1/play?count=${count}&lang=${lang}`, {
    headers: {
      Authorization: token,
    },
  });

  if (!req.ok) throw new Error("Bad request");

  const data: PlayType = await req.json();
  return data;
}
