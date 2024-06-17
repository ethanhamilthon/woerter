import { DeleteWord, GetWord, UpdateWord } from "@/api/word";
import { CardType, Header } from "@/features/home";
import { getCookieValue } from "@/utils/cookie_get";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditPage() {
  //TODO: доделать
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const [word, setWord] = useState<CardType | null>(null);

  function Update() {
    const token = getCookieValue("Authorization");
    if (token === null) {
      return;
    }
    if (word === null) {
      return;
    }
    const newWord = word;
    newWord.title = title;
    newWord.description = desc;
    UpdateWord(newWord, token).then((req) => {
      if (req.ok) {
        navigate("/dic/" + id);
      }
    });
  }

  function Delete() {
    const token = getCookieValue("Authorization");
    if (token === null) {
      return;
    }

    if (word === null) {
      return;
    }

    DeleteWord(token, word.id).then((req) => {
      if (req.ok) {
        navigate("/");
      }
    });
  }
  useEffect(() => {
    const token = getCookieValue("Authorization");
    if (token === null) {
      return;
    }
    if (id === undefined) {
      navigate("/");
      return;
    }
    GetWord(token, id).then((data) => {
      setWord(data);
      setTitle(data.title);
      setDesc(data.description);
    });
  }, []);
  return (
    <>
      <Header />
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
          <div className="w-full flex justify-between items-center">
            <button
              onClick={Delete}
              className="w-1/3 py-4 bg-red-700 rounded-xl px-8 text-white"
            >
              Удалить слово
            </button>
            <button
              onClick={Update}
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
