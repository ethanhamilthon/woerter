import { useI8 } from "@/features/international";

import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { CardType, WordType } from "@/types/words";

export function Card(props: { card: CardType }) {
  const { t } = useI8();
  if (props.card && props.card.words.length !== 0) {
    return (
      <div className="w-full flex flex-wrap gap-3">
        {props.card.words.map((word, i) => {
          return <Word key={i} word={word} />;
        })}
      </div>
    );
  }
  return (
    <div className="w-full min-h-48 flex justify-center items-center">
      <span className="text-lg font-semibold text-zinc-600 text-center">
        {t.WORD.EMPTY1}
        <br />
        {t.WORD.EMPTY2}
      </span>
    </div>
  );
}

export function CardLoading() {
  return (
    <div className="w-full flex flex-wrap gap-3">
      {[...new Array(10)].map((_, i) => {
        return (
          <div
            key={i}
            className="flex-1 min-w-56 h-44 bg-gray-100 rounded-2xl animate-pulse border border-zinc-200 p-2 flex flex-col justify-between"
          >
            <div className="flex flex-col pt-2 gap-2">
              <span className="text-lg font-medium rounded-lg bg-zinc-200 text-zinc-200 animate-pulse">
                Some title
              </span>
              <p className="text-xs rounded-lg bg-zinc-200 text-zinc-200 animate-pulse line-clamp-3 whitespace-pre-line">
                Some description
                <br />
                Some description
                <br />
                Some description
              </p>
            </div>
            <div className="px-4 py-3 flex gap-2 justify-center items-center bg-zinc-200 text-zinc-200 animate-pulse rounded-lg ">
              <span>Some text</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Word(props: { word: WordType }) {
  const { t } = useI8();
  return (
    <div className="flex-1 min-w-72 h-44  rounded-2xl border border-zinc-200 p-2 flex flex-col justify-between">
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
        className="px-4 py-3 flex gap-2 justify-center items-center  rounded-lg text-zinc-600 text-sm bg-white border border-zinc-200 hover:bg-zinc-100 duration-200"
      >
        <Eye />
        {t.WORD.SHOW_FULL}
      </Link>
    </div>
  );
}
