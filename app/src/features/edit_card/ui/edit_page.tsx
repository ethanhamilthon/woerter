import { DeleteWord, GetWord, UpdateWord } from "@/api/word";
import { WordType } from "@/types/words";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditPage() {
  //TODO: доделать
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const [word, setWord] = useState<WordType | null>(null);

  async function Update() {
    if (word !== null) {
      try {
        const newWord = word;
        newWord.title = title;
        newWord.description = desc;
        await UpdateWord(newWord);
        navigate("/app/dic/" + id);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function Delete() {
    if (word !== null) {
      try {
        await DeleteWord(word.id);
        navigate("/app");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function Initial() {
    if (id !== undefined) {
      try {
        const word = await GetWord(id);
        setWord(word);
        setTitle(word.title);
        setDesc(word.description);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/app");
    }
  }
  useEffect(() => {
    Initial();
  }, []);
  return (
    <main className="container flex flex-col gap-12 justify-center bg-white mt-6">
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
          className="py-4 bg-red-700 rounded-xl px-8 text-white"
        >
          Удалить слово
        </button>
        <button
          onClick={Update}
          className=" py-4 bg-purple-700 rounded-xl px-8 text-white"
        >
          Сохранить
        </button>
      </div>
    </main>
  );
}
