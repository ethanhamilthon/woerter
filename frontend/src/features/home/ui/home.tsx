import { LoginPage, useAuthStore } from "@/features/auth";
import { Header } from "./header";
import { CreateCard } from "./create_word";
import { CardsList } from "./cards_list";
import { useEffect } from "react";
import { GetAllWord } from "@/api/word";
import { getCookieValue } from "@/utils/cookie_get";
import { useCardStore } from "..";

export function Home() {
  const { state } = useAuthStore();
  const { setCards } = useCardStore();
  useEffect(() => {
    const token = getCookieValue("Authorization");
    if (token === null) {
      return;
    }
    GetAllWord(token).then((data) => {
      setCards(data);
    });
  }, []);
  return (
    <>
      <Header key="header" />
      <main className="flex justify-center mt-6 bg-white">
        <div className="container flex flex-col gap-8">
          {state !== "logged" ? (
            <LoginPage />
          ) : (
            <>
              <CreateCard />
              <CardsList />
            </>
          )}
        </div>
      </main>
    </>
  );
}
