import { EN_TEXT } from "./en_text";
import { OsLanguageValues } from "./languages";
import { RU_TEXT } from "./ru_text";

export type LanguageText = {
  value: OsLanguageValues;
  t: {
    WORD: {
      CREATE: string;
      SHOW_FULL: string;
      EMPTY1: string;
      EMPTY2: string;
    };
    PLAY: {
      H1_P1: string;
      H1_P2: string;
      MAX: string;
      GO: string;
    };
    ONBOARD: {
      THIS_H1: string;
      THIS_P1: string;
      THIS_B1: string;
      ANOTHER_H1: string;
      ANOTHER_P1: string;
      ANOTHER_P2: string;
      ANOTHER_P3: string;
      ANOTHER_B1: string;
    };
    ASK: {
      B1: string;
      B2: string;
      SELF: string;
      YOUR_LANG: string;
    };
    LOGIN: {
      WELCOME: string;
      NEXT: string;
      GOOGLE: string;
    };
    СREATE: {
      P_EN: string;
      P_DE: string;
    };
  };
};

export const Texts: LanguageText[] = [RU_TEXT, EN_TEXT];
