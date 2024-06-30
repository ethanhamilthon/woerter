import { OsLanguageValues, useI8Store } from "../store/langs";

export function useI8() {
  const { currentLang, text, setLang } = useI8Store();
  function setLanguage(lang: string) {
    setLang(Convert(lang));
  }
  return {
    oslang: currentLang,
    t: text.t,
    setLanguage,
  };
}

function Convert(lang: string) {
  let oslang: OsLanguageValues = "english";
  switch (lang) {
    case "en":
    case "english":
      oslang = "english";
      break;
    case "ru":
    case "russian":
      oslang = "russian";
      break;
  }
  return oslang;
}
