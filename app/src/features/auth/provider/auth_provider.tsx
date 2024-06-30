import React from "react";
import { getCookieValue, deleteCookie } from "@/utils/cookie_get";
import { LanguageType, ProfileType, useAuthStore } from "../store/auth_store";
import { GetMe } from "@/api/me";
import { useQuery } from "react-query";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
  //TODO: надо закончить проверку через провайдер
  const { changeState, changeProfile } = useAuthStore();

  useQuery("getme", async () => {
    const token = getCookieValue("Authorization");
    if (token === null) {
      changeState("noinfo");
      return;
    }
    const data = await GetMe(token);
    if (data.ok) {
      let body: {
        user: ProfileType;
        languages: LanguageType[];
      } = await data.json();
      changeProfile(body);
      changeState("logged");
    } else {
      console.log(data.status, data.statusText);
      if (data.status === 404) {
        deleteCookie("Authorization");
      }
    }

    return data;
  });

  return props.children;
}
