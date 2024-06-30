import React, { useLayoutEffect } from "react";
import { getCookieValue, deleteCookie } from "@/utils/cookie_get";
import { LanguageType, ProfileType, useAuthStore } from "../store/auth_store";
import { GetMe } from "@/api/me";
import { Navigate } from "react-router-dom";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
  //TODO: надо закончить проверку через провайдер
  const { changeState, changeProfile } = useAuthStore();
  useLayoutEffect(() => {
    async function some() {
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
    }
    some();
  }, []);

  const token = getCookieValue("Authorization");
  if (token === null || token === "") {
    return <Navigate to={"/app/login"} />;
  }

  return props.children;
}
