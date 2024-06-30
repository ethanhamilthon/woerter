import { OsLanguageValues } from "../store/langs";

export type LanguageText = {
  value: OsLanguageValues;
  t: {
    LAND: {
      H1_P1: string;
      H1_P2: string;
      H1_P3: string;
      T1_P1: string;
      T1_P2: string;
      B1: string;
      B2: string;
      H2: string;
    };
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
  };
};

export const Texts: LanguageText[] = [
  {
    value: "russian",
    t: {
      LAND: {
        H1_P1: "Запомни слова",
        H1_P2: "навсегда",
        H1_P3: "через ИИ!",
        T1_P1: "Лучший ИИ сервис для изучение",
        T1_P2: "другого языка. Начни сейчас бесплатно!",
        B1: "Попробвать",
        B2: "Перейти",
        H2: "Ты сможешь!",
      },
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
    },
  },
  {
    value: "english",
    t: {
      LAND: {
        H1_P1: "Remember a word",
        H1_P2: "forever",
        H1_P3: "with our new AI!",
        T1_P1: "The best AI service for learning",
        T1_P2: "another language. Start now for free!",
        B1: "Let's try",
        B2: "Go to account",
        H2: "You are also able",
      },
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
    },
  },
];
