import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCardStore } from "..";
import { Capitalize } from "@/utils/string";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useI8 } from "@/features/international";
import { GetAllWord } from "@/api/word";
import { Card, CardLoading } from "./card";
import { CardType } from "@/types/words";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export function CardsList() {
  const { t } = useI8();
  const { cards, setCards, state, setLoaded } = useCardStore();
  const query = useQueryParams();
  const target = query.get("target");
  const navigate = useNavigate();
  const [currentTarget, setCurrentTarget] = useState("");

  async function Initial() {
    try {
      const data = await GetAllWord();
      setCards(data);
      setLoaded();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Initial();
  }, []);
  useEffect(() => {
    if (state === "loaded") {
      if (target !== null) {
        setCurrentTarget(target);
      } else {
        navigate("/app/?target=" + cards[0].language);
      }
    }
  }, [cards, state, target]);
  if (
    state === "loaded" &&
    (target === null || !cards.map((card) => card.language).includes(target))
  ) {
    return <Navigate to={"/app/?target=" + cards[0].language} />;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full items-center justify-between flex border-b border-b-zinc-100 sticky top-0 bg-white py-3 z-40">
        {state === "loaded" ? (
          <LanguageChange cards={cards} currentTarget={currentTarget} />
        ) : (
          <LanguageChangeLoading />
        )}
        <Link
          to={"/app/ask/" + currentTarget}
          className="flex justify-center font-medium text-sm  px-5 py-3 sm:py-3 sm:px-6 bg-purple-700 items-center text-white rounded-lg"
        >
          + {t.WORD.CREATE}
        </Link>
      </div>
      {state === "loaded" ? (
        <Card card={cards.find((card) => card.language === currentTarget)!} />
      ) : (
        <CardLoading />
      )}
    </div>
  );
}

function LanguageChange(props: { cards: CardType[]; currentTarget: string }) {
  return (
    <div className="flex items-center">
      {props.cards.map((card) => {
        return (
          <Link
            to={"/app/?target=" + card.language}
            key={card.language}
            className={cn("py-3 px-6 rounded-t-lg text-zinc-400", {
              "border-b-4 border-b-purple-600 text-zinc-800 font-medium":
                props.currentTarget === card.language,
            })}
          >
            {Capitalize(card.language)}
          </Link>
        );
      })}
    </div>
  );
}

function LanguageChangeLoading() {
  return (
    <div className="flex items-center gap-1">
      <div className="py-3 px-6 rounded-lg text-zinc-300 bg-zinc-300 animate-pulse">
        Sometext
      </div>
      <div className="py-3 px-6 rounded-lg text-zinc-300 bg-zinc-300 animate-pulse">
        Sometext
      </div>
    </div>
  );
}
