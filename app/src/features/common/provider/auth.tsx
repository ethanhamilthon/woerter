import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getCookieValue, deleteCookie } from "@/utils/cookie";
import { useAuthStore } from "../store/auth";
import { GetMe } from "@/api/me";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
  const { changeState, changeProfile, state } = useAuthStore();
  async function Initial() {
    const token = getCookieValue("Authorization");
    if (token === null) {
      changeState("noinfo");
      return;
    }
    try {
      const user = await GetMe(token);
      changeProfile(user);
      changeState("logged");
    } catch (error) {
      changeState("noinfo");
      deleteCookie("Authorization");
    }
  }
  useEffect(() => {
    Initial();
  }, []);

  if (state === "noinfo") {
    return <Navigate to={"/app/login"} />;
  }

  return props.children;
}
