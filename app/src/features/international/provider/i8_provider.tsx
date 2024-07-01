import { ReactNode, useLayoutEffect } from "react";
import { useI8 } from "..";
import { useAuthStore } from "@/features/common";

function GetOSLang(state: string, userLanguage: string) {
  if (state !== "logged" || userLanguage === "") {
    const lsLang = localStorage.getItem("lang");
    if (lsLang !== null) {
      return lsLang;
    } else {
      return navigator.language.substring(0, 2);
    }
  } else if (state === "logged" && userLanguage !== "") {
    localStorage.setItem("lang", userLanguage);
    return userLanguage;
  }
  return navigator.language.substring(0, 2);
}

export function I8Provider(props: { children: ReactNode }) {
  const { state, profile } = useAuthStore();
  const { setLanguage } = useI8();
  useLayoutEffect(() => {
    setLanguage(GetOSLang(state, profile.user.language));
  }, [state, profile]);
  return props.children;
}
