import { LanguageText } from "./all_text";

export const EN_TEXT: LanguageText = {
  value: "english",
  t: {
    WORD: {
      CREATE: "Add",
      SHOW_FULL: "Show all",
      EMPTY1: "It's empty here,",
      EMPTY2: "add new words 🤪",
    },
    PLAY: {
      H1_P1: "Let's",
      H1_P2: "learn!",
      MAX: "words to review (up to 50)",
      GO: "Let's go!",
    },
    ONBOARD: {
      THIS_H1: "Select your primary language:",
      THIS_P1: `Choose the language you speak fluently. All interfaces
      and word descriptions will be in this language. You can only change
      the language once every 30 days.`,
      THIS_B1: "Save",
      ANOTHER_H1: "Select languages to learn:",
      ANOTHER_P1: "Choose only the languages you really want to study.",
      ANOTHER_P2: "You haven't selected anything yet.",
      ANOTHER_P3: "You have selected: ",
      ANOTHER_B1: "Save",
    },
    ASK: {
      B1: "Generate",
      B2: "Go to word",
      SELF: "I'll write it myself",
      YOUR_LANG: "Write in ",
      INPUT_P: "Keep it short and clear ;)",
      G_M: "How to get a good result?",
      G1: "- Write the word in the language: ",
      G2: "- Write the word without grammatical changes",
      G3: "- If possible, write only the word or a short phrase",
    },
    LOGIN: {
      WELCOME: "Welcome!",
      NEXT: "Please log in with Google to continue 👀",
      GOOGLE: "Log in with Google",
    },
    CREATE: {
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
      TITLE: "Your word:",
      TITLE_P: "Keep it short and clear ;)",
      DESC: "What does it mean:",
      DESC_P: "Write a description for your word:",
      SELF: "I want to do it myself",
      GEN: "Generate",
      GEN1: "1. Copy the prompt:",
      GEN2_P1: "2. Go to the site ",
      GEN2_P2: " and paste the text",
      GEN3: "3. Copy the result and paste it into the description field",
      SAVE: "Save",
    },
    EDIT: {
      TITLE: "Your word:",
      TITLE_P: "Keep it short and clear ;)",
      DESC: "What does it mean:",
      DESC_P: "Write a description for your word:",
      DELETE: "Delete",
      SAVE: "Save",
    },
    GOPLAY: {
      END: "Finish",
      NEXT: "Next",
      BACK: "Back",
    },
    HEADER: {
      WORDS: "Words",
      PLAY: "Game",
      PROFILE: "Profile",
      HI: "Hi, ",
      NEW: "New word",
      CHOOSE: "Choose language",
    },
    PROFILE: {
      TLANGS: "You're learning these languages:",
      OSLANG: "System language:",
      LOGOUT: "Log out",
    },
  },
};
