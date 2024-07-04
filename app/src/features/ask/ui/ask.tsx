import { useAuthStore } from "@/features/common";
import { useI8 } from "@/features/international";
import { getCookieValue } from "@/utils/cookie";
import { Capitalize } from "@/utils/string";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function AskPage() {
  const { lang } = useParams();
  const { t } = useI8();
  const [msgs, setMsgs] = useState<string[]>([]);
  const [word, setWord] = useState("");
  const { profile } = useAuthStore();
  const [requested, setRequested] = useState(false);
  const [wordId, setWordID] = useState("");
  const [isLoading, setLoading] = useState(false);
  if (
    lang === undefined ||
    !profile.languages
      .map((language) => {
        return language.name;
      })
      .includes(lang)
  ) {
    return <Navigate to={"/app"} />;
  }
  async function Getdata() {
    if (isLoading) return;
    setLoading(true);
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
    setLoading(false);
  }
  return (
    <main className="container flex flex-col gap-6  justify-center mt-12">
      {!requested && (
        <>
          <div className="w-full flex flex-col gap-4 ">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-zinc-500">
                {t.ASK.YOUR_LANG + " "}{" "}
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
                  {Capitalize(lang)}
                </span>
              </span>
              <Link
                to={"/app/create/" + lang}
                className="underline text-zinc-400 cursor-pointer hover:text-zinc-600"
              >
                {t.ASK.SELF}
              </Link>
            </div>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder={t.ASK.INPUT_P}
              className="border border-zinc-300 rounded-2xl pl-6 py-3 focus:outline focus:outline-purple-500"
            />
          </div>
          <Guide lang={Capitalize(lang)} />
        </>
      )}
      {requested && (
        <div className="w-full">
          <p className="text-zinc-600 font-light whitespace-pre-line">
            {msgs.map((txt) => {
              return txt;
            })}
          </p>
        </div>
      )}
      <div className="w-full flex justify-end items-center mt-8">
        {requested ? (
          <Link
            to={"/app/dic/" + wordId}
            className=" py-4 bg-emerald-500 rounded-xl px-8 text-white"
          >
            {t.ASK.B2}
          </Link>
        ) : (
          <button
            onClick={Getdata}
            disabled={word === "" || isLoading}
            className=" py-4 bg-purple-700 rounded-xl px-8 text-white disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            {t.ASK.B1}
          </button>
        )}
      </div>
    </main>
  );
}

function Guide(props: { lang: string }) {
  const [open, setOpen] = useState(false);
  const { t } = useI8();
  return (
    <div className="w-full flex flex-col gap-4 p-2 px-4 bg-purple-100 border border-purple-300 rounded-lg">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between text-sm items-center cursor-pointer text-purple-800"
      >
        <span>{t.ASK.G_M}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>
      {open && (
        <div className="flex flex-col gap-1 text-xs font-light text-purple-600">
          <span>{t.ASK.G1 + props.lang} </span>
          <span>{t.ASK.G2}</span>
          <span>{t.ASK.G3}</span>
        </div>
      )}
    </div>
  );
}
