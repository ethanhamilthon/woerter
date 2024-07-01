import { CardType } from "@/types/words";
import { create } from "zustand";

type ICards = {
  state: "loading" | "loaded";
  cards: CardType[];
  setCards: (newCards: CardType[]) => void;
  addCard: (newCard: CardType) => void;
  setLoaded: () => void;
};

export const useCardStore = create<ICards>((set) => ({
  state: "loading",
  cards: [],
  setCards: (newCards) => set({ cards: newCards }),
  addCard: (newCard) => set((state) => ({ cards: [...state.cards, newCard] })),
  setLoaded: () => set({ state: "loaded" }),
}));
