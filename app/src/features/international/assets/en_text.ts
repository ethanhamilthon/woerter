import { LanguageText } from "./all_text";

export const EN_TEXT: LanguageText = {
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
    СREATE: {
      P_EN: `Explain to me what the word "[[]]" means in English. The answer is needed in English.
      First, explain in general what this word means. Then make 3 sentences in English and provide
      the translation in English. Explain the meaning of the word specifically in the context of
      each sentence. Write concisely and clearly, without unnecessary information. The answer is
      needed without Markdown formatting.`,
      P_DE: `Explain to me what the word "[[]]" means in German. The answer is needed in English.
      First, explain in general what this word means. Then make 3 sentences in German and provide
      the translation in English. Explain the meaning of the word specifically in the context of
      each sentence. Write concisely and clearly, without unnecessary information. The answer is
      needed without Markdown formatting.`,
    },
  },
};
