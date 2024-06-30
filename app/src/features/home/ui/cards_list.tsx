import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCardStore, CardType } from "..";
import { Eye } from "lucide-react";
import { WordType } from "../store/card_store";
import { Capitalize } from "@/utils/string";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useI8 } from "@/features/international";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function CardsList() {
  const { t } = useI8();
  const { cards } = useCardStore();
  const query = useQuery();
  const navigate = useNavigate();
  const [currentTarget, setCurrentTarget] = useState("");
  useEffect(() => {
    if (cards !== undefined && cards !== null && cards.length !== 0) {
      const target = query.get("target");
      if (target === null) {
        navigate("/app/?target=" + cards[0]?.language);
        return;
      }
      if (!cards.map((card) => card.language).includes(target)) {
        navigate("/app/?target=" + cards[0]?.language);
      }
      setCurrentTarget(target);
    }
  }, [cards, query]);
  if (cards === undefined || cards === null || cards.length === 0) {
    return (
      <div className="w-full flex items-center justify-center font-semibold h-32 text-3xl">
        😅 Пока нету слов тут
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full items-center justify-between flex border-b border-b-zinc-100 sticky top-0 bg-white py-3">
        <div className="flex items-center">
          {cards.map((card) => {
            return (
              <Link
                to={"/app/?target=" + card.language}
                key={card.language}
                className={cn("py-3 px-6 rounded-t-lg text-zinc-400", {
                  "border-b-4 border-b-purple-600 text-zinc-800 font-medium":
                    currentTarget === card.language,
                })}
              >
                {Capitalize(card.language)}
              </Link>
            );
          })}
        </div>
        <Link
          to={"/app/ask/" + currentTarget}
          className="flex justify-center font-medium text-sm  px-5 py-3 sm:py-3 sm:px-6 bg-purple-700 items-center text-white rounded-lg"
        >
          + {t.WORD.CREATE}
        </Link>
      </div>
      {cards.map((card, i) => {
        return currentTarget === card.language ? (
          <Card key={i} card={card} />
        ) : null;
      })}
    </div>
  );
}

function Card(props: { card: CardType }) {
  const { t } = useI8();
  return props.card.words && props.card.words.length !== 0 ? (
    <div className="w-full flex flex-wrap gap-3">
      {props.card.words.map((word, i) => {
        return <Word key={i} word={word} />;
      })}
    </div>
  ) : (
    <div className="w-full min-h-48 flex justify-center items-center">
      <span className="text-lg font-semibold text-zinc-600 text-center">
        {t.WORD.EMPTY1}
        <br />
        {t.WORD.EMPTY2}
      </span>
    </div>
  );
}

function Word(props: { word: WordType }) {
  const { t } = useI8();
  return (
    <div className="flex-1 min-w-56 h-44 bg-gray-50 rounded-2xl border border-zinc-200 p-2 flex flex-col justify-between">
      <div className="flex flex-col pt-2 pl-2">
        <span className="text-lg font-medium text-zinc-900">
          {props.word.title}
        </span>
        <p className="text-xs text-zinc-500 text line-clamp-3 whitespace-pre-line">
          {props.word.description}
        </p>
      </div>
      <Link
        to={"/app/dic/" + props.word.id}
        className="px-4 py-3 flex gap-2 justify-center items-center  rounded-lg text-zinc-900 bg-white border border-zinc-200 hover:bg-zinc-200 duration-200"
      >
        <Eye />
        {t.WORD.SHOW_FULL}
      </Link>
    </div>
  );
}
