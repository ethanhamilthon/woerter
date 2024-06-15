import { create } from "zustand";

export type CardType = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  target_language: string;
  os_language: string;
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
