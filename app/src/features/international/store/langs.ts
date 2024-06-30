import { create } from "zustand";
import { LanguageText, Texts } from "../assets/all_text";

type Language = {
  value: string;
  short: string;
  text: string;
  icon: string;
};

export const OsLanguages: Language[] = [
  {
    value: "russian",
    short: "RU",
    text: "Русский язык",
    icon: "russian.png",
  },
  {
    value: "english",
    short: "EN",
    text: "English",
    icon: "english.png",
  },
];

export type OsLanguageValues = "russian" | "english";

type II8 = {
  currentLang: OsLanguageValues;
  text: LanguageText;
  setLang: (lang: OsLanguageValues) => void;
};

export const useI8Store = create<II8>((set) => ({
  currentLang: "russian",
  text: Texts[0],
  setLang: (lang) =>
    set(() => {
      const newText = Texts.filter((text) => text.value === lang)[0];
      return { currentLang: lang, text: newText };
    }),
}));
