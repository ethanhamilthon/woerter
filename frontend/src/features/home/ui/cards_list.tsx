import { Link } from "react-router-dom";
import { useCardStore, CardType } from "..";
import { Eye, ChevronDown, ChevronUp } from "lucide-react";
import { WordType } from "../store/card_store";
import { Capitalize } from "@/utils/string";
import { useState } from "react";

export function CardsList() {
  const { cards } = useCardStore();
  if (cards === undefined || cards === null || cards.length === 0) {
    return (
      <div className="w-full flex items-center justify-center font-semibold h-32 text-3xl">
        😅 Пока нету слов тут
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-8 px-4">
      {cards.map((card, i) => {
        return <Card key={i} card={card} />;
      })}
    </div>
  );
}

function Card(props: { card: CardType }) {
  const [closed, setClose] = useState(false);
  return (
    <div className="w-full flex flex-col gap-3 p-4  border border-zinc-200 rounded-lg">
      <div className="flex w-full items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setClose((prev) => !prev)}
        >
          <span className="text-xl  font-semibold text-zinc-600">
            {Capitalize(props.card.language)}
          </span>
          {closed ? (
            <ChevronDown className="text-zinc-6000" />
          ) : (
            <ChevronUp className="text-zinc-6000" />
          )}
        </div>
        <Link
          to={"/create/" + props.card.language}
          className="flex justify-center font-medium text-sm  px-5 py-3 sm:py-3 sm:px-6 bg-purple-700 items-center h-full text-white rounded-lg"
        >
          + Создать
        </Link>
      </div>
      {!closed &&
        (props.card.words && props.card.words.length !== 0 ? (
          <div className="w-full flex flex-wrap gap-3">
            {props.card.words.map((word, i) => {
              return <Word key={i} word={word} />;
            })}
          </div>
        ) : (
          <div className="w-full min-h-48 flex justify-center items-center">
            <span className="text-lg font-semibold text-zinc-600 text-center">
              Тут пока пусто,
              <br />
              создайте новых слов 🤪
            </span>
          </div>
        ))}
    </div>
  );
}

function Word(props: { word: WordType }) {
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
        to={"/dic/" + props.word.id}
        className="px-4 py-3 flex gap-2 justify-center items-center  rounded-lg text-zinc-900 bg-white border border-zinc-200 hover:bg-zinc-200 duration-200"
      >
        <Eye />
        Show full
      </Link>
    </div>
  );
}
