export const TargetLanguages = [
  {
    value: "english",
    text: "English",
    icon: "english.png",
  },
  {
    value: "german",
    text: "Deutsch",
    icon: "german.png",
  },
];

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
  {
    value: "french",
    short: "FR",
    text: "Fransızca",
    icon: "french.png",
  },
  {
    value: "turkish",
    short: "TR",
    text: "Türkçe",
    icon: "turkish.png",
  },
];

export type Language = {
  value: string;
  short: string;
  text: string;
  icon: string;
};

export type OsLanguageValues = "russian" | "english" | "french" | "turkish";
