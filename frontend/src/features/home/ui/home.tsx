import { LoginPage, useAuthStore } from "@/features/auth";
import { Header } from "./header";
import { CreateCard } from "./create_word";
import { CardsList } from "./cards_list";
import { GetAllWord } from "@/api/word";
import { getCookieValue } from "@/utils/cookie_get";
import { useCardStore } from "..";
import { useQuery } from "react-query";

export function Home() {
  const { state } = useAuthStore();
  const { setCards } = useCardStore();

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
      <main className="flex justify-center mt-6 bg-white">
        <div className="container flex flex-col gap-8">
          {state === "noinfo" ? (
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
