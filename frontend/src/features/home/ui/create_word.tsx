import { useAuthStore } from "@/features/auth";
import { useCardStore } from "..";

export function Top() {
  const { profile } = useAuthStore();
  const { cards } = useCardStore();
  return (
    <div className="w-full  flex justify-between  rounded-xl items-center px-4">
      <h2 className="text-lg sm:text-2xl font-semibold text-zinc-900 leading-tight">
        Hi, {profile.user.name}!
      </h2>
      <span>
        У вас{" "}
        {cards !== undefined &&
          cards.reduce((acc, card) => {
            return acc + (card.words ? card.words.length : 0);
          }, 0)}{" "}
        слов
      </span>
    </div>
  );
}
