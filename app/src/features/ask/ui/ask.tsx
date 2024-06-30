import { useAuthStore } from "@/features/auth";

import { cn } from "@/utils/cn";
import { getCookieValue } from "@/utils/cookie_get";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function AskPage() {
  const { lang } = useParams();
  const [msgs, setMsgs] = useState<string[]>([]);
  const [word, setWord] = useState("");
  const { profile } = useAuthStore();
  const [wordType, setWordType] = useState<"this" | "another">("this");
  const [requested, setRequested] = useState(false);
  const [wordId, setWordID] = useState("");
  async function Getdata() {
    if (
      lang === undefined ||
      !profile.languages
        .map((language) => {
          return language.name;
        })
        .includes(lang)
    ) {
      return;
    }
    const token = getCookieValue("Authorization");
    if (token === null) {
      return;
    }
    const id = uuidv4();
    const res = await fetch("/api/v1/ask", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        oslang: profile.user.language,
        tolang: lang,
        word: word,
      }),
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      console.log("error");
      return;
    }
    setWordID(id);
    setRequested(true);

    const reader = res.body?.getReader();

    const decoder = new TextDecoder("utf-8");

    while (true) {
      if (reader === undefined) continue;
      const { done, value } = await reader.read();
      if (done) {
        console.log("breaked");
        break;
      }
      const text = decoder.decode(value);
      setMsgs((prev) => [...prev, text]);
    }
  }
  return (
    <main className="container flex flex-col gap-12  justify-center mt-12">
      {!requested && (
        <div className="w-full flex flex-col gap-4 ">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-zinc-700">
              Генерация ответа
            </span>
            <Link
              to={"/app/create/" + lang}
              className="underline text-zinc-400 cursor-pointer hover:text-zinc-600"
            >
              Сам пишу
            </Link>
          </div>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Пишите ваше слово"
            className="border border-zinc-300 rounded-2xl pl-6 py-3 focus:outline focus:outline-purple-500"
          />
        </div>
      )}
      {!requested && (
        <div className="w-full flex flex-col gap-4">
          <div
            className={cn(
              "w-full flex items-center gap-4 p-3 border border-zinc-200 rounded-lg cursor-pointer",
              {
                "border-purple-300 bg-purple-600 text-white":
                  wordType === "this",
              }
            )}
            onClick={() => setWordType("this")}
          >
            <span>🚀</span>
            <span>Хочу узнать что означает это слова</span>
          </div>
          <div
            className={cn(
              "w-full flex items-center gap-4 p-3 border border-zinc-200 rounded-lg cursor-pointer",
              {
                "border-purple-300 bg-purple-600 text-white":
                  wordType === "another",
              }
            )}
            onClick={() => setWordType("another")}
          >
            <span>🥸</span>
            <span>Хочу узнать как слово переводится</span>
          </div>
        </div>
      )}
      <div className="w-full">
        <p className="text-zinc-600 font-light whitespace-pre-line">
          {msgs.map((txt) => {
            return txt;
          })}
        </p>
      </div>
      <div className="w-full flex justify-end items-center">
        {requested ? (
          <Link
            to={"/app/dic/" + wordId}
            className=" py-4 bg-emerald-500 rounded-xl px-8 text-white"
          >
            Перейти к слову
          </Link>
        ) : (
          <button
            onClick={Getdata}
            disabled={word === ""}
            className=" py-4 bg-purple-700 rounded-xl px-8 text-white disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            Сохранить
          </button>
        )}
      </div>
    </main>
  );
}
