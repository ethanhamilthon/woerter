import { Link } from "react-router-dom";
import { useCardStore, CardType } from "..";
import { Eye } from "lucide-react";

export function CardsList() {
  const { cards } = useCardStore();
  if (cards.length === 0) {
    return (
      <div className="w-full flex items-center justify-center h-32 text-3xl">
        😅 Пока нету слов тут
      </div>
    );
  }
  return (
    <div className="w-full flex flex-wrap gap-3">
      {cards.map((card, i) => {
        return <Card key={i} card={card} />;
      })}
    </div>
  );
}

function Card(props: { card: CardType }) {
  return (
    <div className="flex-1 min-w-56 h-44 bg-gray-50 rounded-2xl border border-zinc-200 p-2 flex flex-col justify-between">
      <div className="flex flex-col pt-2 pl-2">
        <span className="text-lg font-medium text-zinc-900">
          {props.card.title}
        </span>
        <p className="text-xs text-zinc-500 text line-clamp-3 whitespace-pre-line">
          {props.card.description}
        </p>
      </div>
      <Link
        to={"/dic/" + props.card.id}
        className="px-4 py-3 flex gap-2 justify-center items-center  rounded-lg text-zinc-900 bg-white border border-zinc-200 hover:bg-zinc-200 duration-200"
      >
        <Eye />
        Show full
      </Link>
    </div>
  );
}
