import { OsLanguageValues } from "../store/langs";

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
  };
};

export const Texts: LanguageText[] = [
  {
    value: "russian",
    t: {
      WORD: {
        CREATE: "Создать",
        SHOW_FULL: "Показать",
        EMPTY1: "Тут пока пусто,",
        EMPTY2: "создайте новых слов 🤪",
      },
      PLAY: {
        H1_P1: "Давайте,",
        H1_P2: "повторять!",
        MAX: "слов хочу повторять, (максимум 50)",
        GO: "Начали!",
      },
      ONBOARD: {
        THIS_H1: "Выберите ваш основной язык:",
        THIS_P1: `Выберите язык, на котором вы свободно говорите. Все интерфейсы
        системы и описания слов будут на этом языке. Вы сможете изменить
        язык только один раз в течение 30 дней.`,
        THIS_B1: "Сохранить",
        ANOTHER_H1: "Выберите языки, которые хотите изучать:",
        ANOTHER_P1:
          "Выберите только те языки, которые действительно хотите изучать.",
        ANOTHER_P2: "Вы пока ничего не выбрали.",
        ANOTHER_P3: "Вы выбрали: ",
        ANOTHER_B1: "Сохранить",
      },
      ASK: {
        B1: "Генерировать",
        B2: "Перейти к слову",
        SELF: "Сам напишу",
        YOUR_LANG: "Ваш язык:",
      },
      LOGIN: {
        WELCOME: "Добро пожаловать!",
        NEXT: "Пожалуйста, пройдите через Google, чтобы дальше изучать 👀",
        GOOGLE: "Зайти через Google",
      },
    },
  },
  {
    value: "english",
    t: {
      WORD: {
        CREATE: "Create",
        SHOW_FULL: "Show full",
        EMPTY1: "Here is still empty,",
        EMPTY2: "let's create a new word 🤪",
      },
      PLAY: {
        H1_P1: "Go play,",
        H1_P2: "Go repeat!",
        MAX: "words I want to repeat (max. 50)",
        GO: "Start",
      },
      ONBOARD: {
        THIS_H1: "Select your native language:",
        THIS_P1: `Choose the language you are fluent in. All system interfaces
        and word descriptions will be in this language. You can change
        the language only once within 30 days.`,
        THIS_B1: "Save",
        ANOTHER_H1: "Select the languages you want to learn:",
        ANOTHER_P1: "Choose only the languages you genuinely want to learn.",
        ANOTHER_P2: "You haven't selected anything yet.",
        ANOTHER_P3: "You have selected: ",
        ANOTHER_B1: "Save",
      },
      ASK: {
        B1: "Generate",
        B2: "Go to the word",
        SELF: "Write myself",
        YOUR_LANG: "Your language:",
      },
      LOGIN: {
        WELCOME: "Welcome back!",
        NEXT: "Please, sign up with google to go further 👀",
        GOOGLE: "Sign up with Google",
      },
    },
  },
];
