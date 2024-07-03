import { create } from "zustand";
import { LanguageText, Texts } from "../assets/all_text";
import { OsLanguageValues } from "../assets/languages";

type II8 = {
  currentLang: OsLanguageValues;
  text: LanguageText;
  setLang: (lang: OsLanguageValues) => void;
};

export const useI8Store = create<II8>((set) => ({
  currentLang: "english",
  text: Texts[0],
  setLang: (lang) =>
    set(() => {
      const newText = Texts.filter((text) => text.value === lang)[0];
      return { currentLang: lang, text: newText };
    }),
}));
