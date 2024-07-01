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
import { useI8 } from "@/features/international";
import { useAuthStore } from "@/features/common";

export function PlayPage() {
  const { t } = useI8();
  const [count, setCount] = useState(10);
  const [lang, setLang] = useState("");
  const { profile } = useAuthStore();
  const { setCard, card } = usePlayStore();
  const navigate = useNavigate();
  async function LoadData() {
    try {
      const data = await GoPlayLoad(count, lang);
      setCard(data);
      navigate("/app/goplay");
    } catch (error) {}
  }

  if (card !== null) {
    return <Navigate to={"/app/goplay"} />;
  }

  function InputValue(value: string) {
    const num = Number(value);
    if (!isNaN(num)) {
      if (num >= 0 && num <= 50) setCount(num);
    }
  }

  useEffect(() => {
    if (profile.languages[0]) {
      setLang(profile.languages[0].name);
    }
  }, [profile]);
  //TODO: Добавить выбор языка, по нему автоматический count, Добавить примерную времю который займет повтор
  return (
    <main className="container justify-center pt-12 flex flex-col items-center gap-6">
      <h2 className="text-4xl font-bold text-center">
        {t.PLAY.H1_P1}
        <br />
        <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
          {t.PLAY.H1_P2}
        </span>
      </h2>
      <div className="flex flex-col gap-2 items-center">
        <div className="w-56 bg-zinc-100 flex divide-x divide-zinc-300 rounded-lg">
          <span
            onClick={() => {
              if (count > 10) {
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
              if (count < 50) {
                setCount((prev) => prev + 1);
              }
            }}
            className="py-4 select-none w-1/3 flex justify-center items-center cursor-pointer"
          >
            +
          </span>
        </div>
        <span className="text-xs font-light text-zinc-500">{t.PLAY.MAX}</span>
      </div>
      <Select value={lang} onValueChange={(value) => setLang(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выберите язык" />
        </SelectTrigger>
        <SelectContent>
          {profile.languages.map((language) => (
            <SelectItem key={language.name} value={language.name}>
              {Capitalize(language.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        onClick={LoadData}
        disabled={lang === "" || count < 10 || count > 50}
        className="bg-gradient-to-br mt-12 from-indigo-400 to-indigo-600 rounded-lg disabled:from-zinc-300 disabled:to-zinc-400 disabled:cursor-not-allowed text-white py-4 px-8"
      >
        {t.PLAY.GO}
      </button>
    </main>
  );
}
