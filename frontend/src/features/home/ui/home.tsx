import { LoginPage, useAuthStore } from "@/features/auth";
import { Header } from "./header";
import { CardsList } from "./cards_list";
import { GetAllWord } from "@/api/word";
import { getCookieValue } from "@/utils/cookie_get";
import { useCardStore } from "..";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { state, profile } = useAuthStore();
  const { setCards } = useCardStore();
  const navigate = useNavigate();

  if (state === "logged" && profile.languages.length === 0) {
    navigate("/onboard");
  }

  useQuery("words", async () => {
    const token = getCookieValue("Authorization");
    if (token === null) {
      return;
    }
    const data = await GetAllWord(token);
    setCards(data);
    return data;
  });
  return (
    <>
      <Header key="header" />
      <main className="flex justify-center bg-white">
        <div className="container flex flex-col gap-8">
          {state === "noinfo" ? (
            <LoginPage />
          ) : (
            <>
              <CardsList />
            </>
          )}
        </div>
      </main>
    </>
  );
}
