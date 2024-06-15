import { useCardStore } from "..";

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
    <div className="w-full flex flex-col gap-3">
      {cards.map((card) => {
        return (
          <div className="w-full px-8 py-4 rounded-2xl border border-zinc-400">
            <h1>{card.title}</h1>
            <span>{card.description}</span>
          </div>
        );
      })}
    </div>
  );
}
