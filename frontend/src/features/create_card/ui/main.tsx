import { Header } from "@/features/home";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCardStore } from "@/features/home";
import { v4 as uuidv4 } from "uuid";
import { CreateWord } from "@/api/word";
import { getCookieValue } from "@/utils/cookie_get";

export function CreateWordPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const { addCard } = useCardStore();

  async function Save() {
    const token = getCookieValue("Authorization");
    const word = {
      id: uuidv4(),
      title: title,
      description: desc,
      created_at: "",
      updated_at: "",
      target_language: "german",
      os_language: "russain",
    };
    if (token === null) {
      return;
    }
    try {
      const data = await CreateWord(word, token);
      addCard(data);
      navigate("/");
    } catch {
      return;
    }
  }
  return (
    <>
      <Header key="header" />
      <main className="flex justify-center bg-white mt-6 w-full">
        <div className="container flex flex-col gap-12">
          <div className="w-full flex flex-col gap-4 ">
            <span className="font-medium">Ваше слово</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Пишите ваше слово"
              className="border border-zinc-300 rounded-2xl pl-6 py-3 focus:outline focus:outline-purple-500"
            />
          </div>
          <div className="w-full flex flex-col gap-4 ">
            <span className="font-medium">Описание</span>
            <textarea
              placeholder="Опишите как можно подробнее"
              rows={10}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border border-zinc-300 rounded-xl pl-6 py-3 focus:outline focus:outline-purple-500"
            />
          </div>
          <div className="w-full flex justify-end items-center">
            <button
              onClick={Save}
              className="w-1/3 py-4 bg-purple-700 rounded-xl px-8 text-white"
            >
              Сохранить
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
