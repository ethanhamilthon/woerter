import React from "react";
import { getCookieValue } from "@/utils/cookie_get";
import { useAuthStore } from "../store/auth_store";
import { GetMe } from "@/api/me";
import { useQuery } from "react-query";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
  //TODO: надо закончить проверку через провайдер
  const { changeState, changeProfile } = useAuthStore();
  useQuery("getme", async () => {
    changeState("loading");
    const token = getCookieValue("Authorization");
    if (token === null) {
      changeState("noinfo");
      return;
    }
    const data = await GetMe(token);
    changeProfile(data);
    changeState("logged");
    return data;
  });
  return <>{props.children}</>;
}
