import { Header, useCardStore } from "@/features/home";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Capitalize } from "@/utils/string";
import { usePlayStore } from "../store/play_store";
import { GoPlayLoad } from "@/api/play";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

export function PlayPage() {
  const [count, setCount] = useState(1);
  const [lang, setLang] = useState("english");
  const { cards } = useCardStore();
  const { setCard, card } = usePlayStore();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (body: { count: number; lang: string }) => {
      return GoPlayLoad(body.count, body.lang);
    },
    mutationKey: ["getPlayData"],
    onSuccess: (data) => {
      setCard(data);
      navigate("/goplay");
    },
  });

  if (card !== null) {
    return <Navigate to={"/goplay"} />;
  }

  function InputValue(value: string) {
    const num = Number(value);
    if (!isNaN(num)) {
      if (num >= 0 && num <= 50) setCount(num);
    }
  }

  useEffect(() => {
    cards.map((card) => {
      if (card.language === lang) {
        setCount(card.words.length);
      }
    });
  }, [lang]);
  //TODO: Добавить выбор языка, по нему автоматический count, Добавить примерную времю который займет повтор
  return (
    <>
      <Header />
      <main className="flex justify-center pt-12">
        <div className="container px-4 flex flex-col items-center gap-6">
          <h2 className="text-4xl font-bold text-center">
            Давайте,
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
              повторять!
            </span>
          </h2>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-56 bg-zinc-100 flex divide-x divide-zinc-300 rounded-lg">
              <span
                onClick={() => {
                  if (count >= 2) {
                    setCount((prev) => prev - 1);
                  }
                }}
                className="py-4 w-1/3 select-none flex justify-center items-center cursor-pointer"
              >
                -
              </span>
              <input
                value={count}
                onChange={(e) => InputValue(e.target.value)}
                className="py-4 w-1/3 flex text-center focus:outline-purple-500 justify-center items-center cursor-pointer "
              />

              <span
                onClick={() => {
                  if (count <= 49) {
                    setCount((prev) => prev + 1);
                  }
                }}
                className="py-4 select-none w-1/3 flex justify-center items-center cursor-pointer"
              >
                +
              </span>
            </div>
            <span className="text-xs font-light text-zinc-500">
              слов хочу повторять, {"("}максимум 50 {")"}
            </span>
          </div>
          <Select defaultValue={lang} onValueChange={(value) => setLang(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите язык" />
            </SelectTrigger>
            <SelectContent>
              {cards.map((card) => (
                <SelectItem key={card.language} value={card.language}>
                  {Capitalize(card.language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            onClick={() => {
              mutation.mutate({ count, lang });
            }}
            disabled={
              lang === "" || count < 10 || count > 50 || mutation.isLoading
            }
            className="bg-gradient-to-br mt-12 from-indigo-400 to-indigo-600 rounded-lg disabled:from-zinc-300 disabled:to-zinc-400 disabled:cursor-not-allowed text-white py-4 px-8"
          >
            Начали!
          </button>
        </div>
      </main>
    </>
  );
}
