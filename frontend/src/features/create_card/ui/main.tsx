import { Header } from "@/features/home";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCardStore } from "@/features/home";
import { v4 as uuidv4 } from "uuid";
import { CreateWord } from "@/api/word";
import { getCookieValue } from "@/utils/cookie_get";
import { cn } from "@/utils/cn";
import { Copy } from "lucide-react";
import { TargetLanguages } from "@/assets/oslanguages";
import { useAuthStore } from "@/features/auth";
import { GetPrompt } from "@/assets/promptlanguages";

export function CreateWordPage() {
  const { lang } = useParams();
  const navigate = useNavigate();
  if (
    lang === undefined ||
    !TargetLanguages.map((tl) => tl.value).includes(lang)
  ) {
    navigate("/");
  }
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { addCard } = useCardStore();
  const { profile } = useAuthStore();
  const [tab, setTab] = useState<"self" | "ai">("self");

  async function Save() {
    const token = getCookieValue("Authorization");
    if (!lang) return;
    const word = {
      id: uuidv4(),
      title: title,
      description: desc,
      created_at: "",
      updated_at: "",
      from_language: profile.user.language,
      to_language: lang,
      type: "self",
    };
    if (token === null) {
      return;
    }
    const data = await CreateWord(word, token);
    addCard(data);
    navigate("/");
  }
  return (
    <>
      <Header key="header" />
      <main className="flex justify-center bg-white mt-6 w-full px-4">
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
            <div className="w-full flex gap-4">
              <div
                className={cn(
                  "flex justify-center items-center py-2 px-4 text-sm bg-zinc-200 text-zinc-500 rounded-lg cursor-pointer",
                  {
                    "bg-purple-700 text-white": tab === "self",
                  }
                )}
                onClick={() => setTab("self")}
              >
                <span>Сам написать</span>
              </div>
              <div
                className={cn(
                  "flex justify-center items-center py-2 px-4 text-sm bg-zinc-200 text-zinc-500 rounded-lg cursor-pointer",
                  {
                    "bg-purple-700 text-white": tab === "ai",
                  }
                )}
                onClick={() => setTab("ai")}
              >
                <span>Генерация ИИ</span>
              </div>
            </div>
            {tab === "self" ? (
              <textarea
                placeholder="Опишите как можно подробнее"
                rows={10}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="border border-zinc-300 rounded-xl pl-6 py-3 focus:outline focus:outline-purple-500"
              />
            ) : (
              <GenerateAI title={title} language={lang || ""} />
            )}
          </div>
          <div className="w-full flex justify-end items-center">
            <button
              onClick={Save}
              className="py-4 bg-purple-700 rounded-xl px-8 text-white"
            >
              Сохранить
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

function GenerateAI(props: { title: string; language: string }) {
  const text = GetPrompt(
    props.title,
    props.language === "german" ? "rus_ger" : "rus_eng"
  );
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <div className="bg-zinc-50 w-full p-6 rounded-xl gap-10 flex flex-col">
      <div className="w-full flex flex-col gap-2">
        <h3>1. Скопируйте промпт:</h3>
        <div className="w-full md:w-2/3 p-6 bg-zinc-100 rounded-lg relative">
          <div
            className="w-8 h-8 flex justify-center cursor-pointer items-center active:scale-90 duration-100 text-zinc-500 bg-zinc-200 rounded absolute top-2 right-2"
            onClick={copyToClipboard}
          >
            <Copy size={20} />
          </div>
          <p className="text-zinc-500">{text}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h3>
          2. Перейдите в сайт{" "}
          <a
            href="https://chatgpt.com/"
            target="_blank"
            className="text-blue-500"
          >
            https://chatgpt.com/
          </a>{" "}
          И вставте текст.
        </h3>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h3>3. Скопируйте полученный результат и вставте в поле Описание</h3>
      </div>
    </div>
  );
}
