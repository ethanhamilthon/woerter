import { CardType, WordType } from "@/types/words";
import { getToken } from "./get_token";

export async function CreateWord(word: WordType) {
  const token = getToken();
  const req = await fetch("/api/v1/word", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(word),
  });
  if (!req.ok) throw new Error("word not created");
  const data: CardType = await req.json();
  return data;
}

export async function UpdateWord(word: WordType) {
  const token = getToken();
  const req = await fetch("/api/v1/word", {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(word),
  });
  if (!req.ok) throw new Error("word not updated");
  return req;
}

export async function GetAllWord() {
  const token = getToken();
  const req = await fetch("/api/v1/word", {
    headers: {
      Authorization: token,
    },
  });
  const data: CardType[] = await req.json();
  if (!req.ok) throw new Error("words not found");
  return data;
}

export async function GetWord(id: string) {
  const token = getToken();
  const req = await fetch(`/api/v1/word/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  if (!req.ok) throw new Error("words not found");
  const data: WordType = await req.json();

  return data;
}

export async function DeleteWord(id: string) {
  const token = getToken();
  const req = await fetch(`/api/v1/word/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  if (!req.ok) throw new Error("words not found");
  return req;
}
