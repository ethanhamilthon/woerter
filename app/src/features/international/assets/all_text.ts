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
      INPUT_P: string;
    };
    LOGIN: {
      WELCOME: string;
      NEXT: string;
      GOOGLE: string;
    };
    СREATE: {
      P_EN: string;
      P_DE: string;
      TITLE: string;
      TITLE_P: string;
      DESC: string;
      DESC_P: string;
      SELF: string;
      GEN: string;
      GEN1: string;
      GEN2_P1: string;
      GEN2_P2: string;
      GEN3: string;
      SAVE: string;
    };
    EDIT: {
      TITLE: string;
      TITLE_P: string;
      DESC: string;
      DESC_P: string;
      DELETE: string;
      SAVE: string;
    };
    GOPLAY: {
      END: string;
      NEXT: string;
      BACK: string;
    };
    HEADER: {
      WORDS: string;
      PLAY: string;
      PROFILE: string;
      HI: string;
      NEW: string;
      CHOOSE: string;
    };
    PROFILE: {
      TLANGS: string;
      OSLANG: string;
      LOGOUT: string;
    };
  };
};

export const Texts: LanguageText[] = [RU_TEXT, EN_TEXT];
