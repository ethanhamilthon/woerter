import { LanguageText } from "./all_text";

export const FR_TEXT: LanguageText = {
  value: "french",
  t: {
    WORD: {
      CREATE: "Ajouter",
      SHOW_FULL: "Tout afficher",
      EMPTY1: "C'est vide ici,",
      EMPTY2: "ajoute de nouveaux mots 🤪",
    },
    PLAY: {
      H1_P1: "Allons",
      H1_P2: "apprendre!",
      MAX: "mots à réviser (jusqu'à 50)",
      GO: "C'est parti!",
    },
    ONBOARD: {
      THIS_H1: "Choisis ta langue principale :",
      THIS_P1: `Choisis la langue que tu parles couramment. Toutes les interfaces
      et descriptions des mots seront dans cette langue. Tu pourras changer
      la langue une seule fois tous les 30 jours.`,
      THIS_B1: "Enregistrer",
      ANOTHER_H1: "Choisis les langues à apprendre :",
      ANOTHER_P1:
        "Sélectionne seulement les langues que tu veux vraiment étudier.",
      ANOTHER_P2: "Tu n'as encore rien choisi.",
      ANOTHER_P3: "Tu as choisi : ",
      ANOTHER_B1: "Enregistrer",
    },
    ASK: {
      B1: "Générer",
      B2: "Aller au mot",
      SELF: "Je vais écrire moi-même",
      YOUR_LANG: "Écris en ",
      INPUT_P: "Écris court et clair ;)",
      G_M: "Comment obtenir un bon résultat ?",
      G1: "- Écris le mot dans la langue : ",
      G2: "- Écris le mot sans modifications grammaticales",
      G3: "- Si possible, écris seulement le mot ou une courte phrase",
    },
    LOGIN: {
      WELCOME: "Bienvenue!",
      NEXT: "Veuillez vous connecter avec Google pour continuer 👀",
      GOOGLE: "Se connecter avec Google",
    },
    CREATE: {
      P_EN: `Expliquez ce que signifie le mot "[[[]]" en anglais.
      La réponse doit être donnée en français. Donnez d'abord une explication générale du mot.
      Ensuite, faites 3 phrases en anglais et traduisez-les en français. Expliquez
      le sens du mot dans chaque phrase. Rédigez des textes courts et clairs,
      sans informations inutiles. La réponse est nécessaire sans balisage Markdown.`,
      P_DE: `Expliquez la signification du mot "[[[]]" en allemand.
      La réponse est nécessaire en français. Donnez d'abord une explication générale du mot.
      Ensuite, faites 3 phrases en allemand et traduisez-les en français. Expliquez
      le sens du mot dans chaque phrase. Rédigez des textes courts et clairs,
      sans informations inutiles. La réponse est requise sans balisage Markdown`,
      TITLE: "Ton mot :",
      TITLE_P: "Écris court et clair ;)",
      DESC: "Que signifie-t-il :",
      DESC_P: "Écris une description pour ton mot :",
      SELF: "Je veux le faire moi-même",
      GEN: "Générer",
      GEN1: "1. Copie le texte :",
      GEN2_P1: "2. Va sur le site ",
      GEN2_P2: " et colle le texte",
      GEN3: "3. Copie le résultat et colle-le dans le champ de description",
      SAVE: "Enregistrer",
    },
    EDIT: {
      TITLE: "Ton mot :",
      TITLE_P: "Écris court et clair ;)",
      DESC: "Que signifie-t-il :",
      DESC_P: "Écris une description pour ton mot :",
      DELETE: "Supprimer",
      SAVE: "Enregistrer",
    },
    GOPLAY: {
      END: "Terminer",
      NEXT: "Suivant",
      BACK: "Retour",
    },
    HEADER: {
      WORDS: "Mots",
      PLAY: "Jeu",
      PROFILE: "Profil",
      HI: "Salut, ",
      NEW: "Nouveau mot",
      CHOOSE: "Choisir la langue",
    },
    PROFILE: {
      TLANGS: "Tu apprends ces langues :",
      OSLANG: "Langue du système :",
      LOGOUT: "Déconnexion",
    },
  },
};
