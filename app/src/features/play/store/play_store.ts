import { WordType } from "@/types/words";
import { create } from "zustand";

export type PlayType = {
  count: string;
  words: WordType[];
};

type IPlay = {
  card: PlayType | null;
  step: number;
  setCard: (newCards: PlayType) => void;
  stepInc: () => void;
  stepDec: () => void;
  cleanCard: () => void;
};

export const usePlayStore = create<IPlay>((set) => ({
  card: null,
  step: 1,
  setCard: (newCards) => set({ card: newCards }),
  stepInc: () => set((state) => ({ step: state.step + 1 })),
  stepDec: () => set((state) => ({ step: state.step - 1 })),
  cleanCard: () => set({ card: null, step: 1 }),
}));
