import { useCardStore } from "..";
import { Capitalize } from "@/utils/string";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { GetAllWord } from "@/api/word";
import { Card, CardLoading } from "./card";
import { CardType } from "@/types/words";
import { useAuthStore } from "@/features/common";
import { SearchWord } from "./search";

export function CardsList() {
  const { cards, setCards, state, setLoaded } = useCardStore();
  const { profile, state: userState } = useAuthStore();
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
    if (userState === "logged") {
      setCurrentTarget(profile.languages[0].name);
    }
  }, [userState]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full items-center justify-between flex border-b border-b-zinc-100 sticky top-0 bg-white py-3 z-40">
        {state === "loaded" ? (
          <LanguageChange
            cards={cards}
            currentTarget={currentTarget}
            setTarget={(value) => setCurrentTarget(value)}
          />
        ) : (
          <LanguageChangeLoading />
        )}
      </div>
      {state === "loaded" ? (
        <Card card={cards.find((card) => card.language === currentTarget)!} />
      ) : (
        <CardLoading />
      )}
    </div>
  );
}

function LanguageChange(props: {
  cards: CardType[];
  currentTarget: string;
  setTarget: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        {props.cards.map((card) => {
          return (
            <button
              onClick={() => props.setTarget(card.language)}
              key={card.language}
              className={cn("py-2 px-4 rounded-t-lg text-zinc-400 text-sm", {
                "border-b-4 border-b-purple-600 text-zinc-800 font-medium":
                  props.currentTarget === card.language,
              })}
            >
              {Capitalize(card.language)}
            </button>
          );
        })}
      </div>
      <SearchWord />
    </div>
  );
}

function LanguageChangeLoading() {
  return (
    <div className="flex items-center gap-1">
      <div className="py-2 px-4 rounded-lg text-sm text-zinc-300 bg-zinc-300 animate-pulse">
        Somete
      </div>
      <div className="py-2 px-4 rounded-lg text-sm text-zinc-300 bg-zinc-300 animate-pulse">
        Somete
      </div>
    </div>
  );
}
