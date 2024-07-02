import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCardStore } from "@/features/home";
import { v4 as uuidv4 } from "uuid";
import { CreateWord } from "@/api/word";
import { cn } from "@/utils/cn";
import { Copy } from "lucide-react";
import { useAuthStore } from "@/features/common";
import { useI8 } from "@/features/international";

export function CreateWordPage() {
  const { lang } = useParams();
  const { t } = useI8();
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { addCard } = useCardStore();
  const [tab, setTab] = useState<"self" | "ai">("self");

  async function Save() {
    if (lang !== undefined) {
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
      try {
        const data = await CreateWord(word);
        addCard(data);
        navigate("/app");
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (
    lang === undefined ||
    !profile.languages.map((tl) => tl.name).includes(lang)
  ) {
    return <Navigate to="/app" />;
  }
  return (
    <main className="flex flex-col gap-12 container justify-center bg-white mt-6 w-full">
      <div className="w-full flex flex-col gap-4 ">
        <span className="font-medium">{t.СREATE.TITLE}</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.СREATE.TITLE_P}
          className="border border-zinc-300 rounded-2xl pl-6 py-3 focus:outline focus:outline-purple-500"
        />
      </div>
      <div className="w-full flex flex-col gap-4 ">
        <span className="font-medium">{t.СREATE.DESC}</span>
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
            <span>{t.СREATE.SELF}</span>
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
            <span>{t.СREATE.GEN}</span>
          </div>
        </div>
        {tab === "self" ? (
          <textarea
            placeholder={t.СREATE.DESC_P}
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
    </main>
  );
}

function GenerateAI(props: { title: string; language: string }) {
  const { t } = useI8();

  function GetText() {
    switch (props.language) {
      case "english":
        return t.СREATE.P_EN;

      case "german":
        return t.СREATE.P_DE;
      default:
        return t.СREATE.P_EN;
    }
  }

  function GetPrompt() {
    let regex = /\[\[.*?\]\]/g;
    return GetText().replace(regex, props.title);
  }
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(GetPrompt())
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
        <h3>{t.СREATE.GEN1}</h3>
        <div className="w-full md:w-2/3 p-6 bg-zinc-100 rounded-lg relative">
          <div
            className="w-8 h-8 flex justify-center cursor-pointer items-center active:scale-90 duration-100 text-zinc-500 bg-zinc-200 rounded absolute top-2 right-2"
            onClick={copyToClipboard}
          >
            <Copy size={20} />
          </div>
          <p className="text-zinc-500">{GetPrompt()}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h3>
          {t.СREATE.GEN2_P1}
          <a
            href="https://chatgpt.com/"
            target="_blank"
            className="text-blue-500"
          >
            chatgpt.com
          </a>{" "}
          {t.СREATE.GEN2_P2}
        </h3>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h3>{t.СREATE.GEN3}</h3>
      </div>
    </div>
  );
}
