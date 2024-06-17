import { CardType } from "@/features/home";

export async function CreateWord(word: CardType, token: string) {
  const req = await fetch("/api/v1/word", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(word),
  });
  const data: CardType = await req.json();
  return data;
}

export async function UpdateWord(word: CardType, token: string) {
  const req = await fetch("/api/v1/word", {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(word),
  });
  return req;
}

export async function GetAllWord(token: string) {
  const req = await fetch("/api/v1/word", {
    headers: {
      Authorization: token,
    },
  });
  const data: CardType[] = await req.json();
  return data;
}

export async function GetWord(token: string, id: string) {
  const req = await fetch(`/api/v1/word/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  const data: CardType = await req.json();

  return data;
}

export async function DeleteWord(token: string, id: string) {
  const req = await fetch(`/api/v1/word/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  return req;
}
