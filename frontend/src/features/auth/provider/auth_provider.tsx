import React, { useEffect } from "react";
import { getCookieValue } from "@/utils/cookie_get";
import { useAuthStore } from "../store/auth_store";
import { GetMe } from "@/api/me";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
  //TODO: надо закончить проверку через провайдер
  const { changeState, changeProfile } = useAuthStore();
  useEffect(() => {
    changeState("loading");
    const token = getCookieValue("Authorization");
    if (token === null) {
      changeState("noinfo");
      return;
    }
    GetMe(token).then((data) => {
      changeProfile(data);
      changeState("logged");
    });
  }, []);
  return <>{props.children}</>;
}
