import { create } from "zustand";

export type WordType = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  from_language: string;
  to_language: string;
  type: string;
};

export type CardType = {
  language: string;
  words: WordType[];
};

type ICards = {
  cards: CardType[];
  setCards: (newCards: CardType[]) => void;
  addCard: (newCard: CardType) => void;
};

export const useCardStore = create<ICards>((set) => ({
  cards: [],
  setCards: (newCards) => set({ cards: newCards }),
  addCard: (newCard) => set((state) => ({ cards: [...state.cards, newCard] })),
}));
