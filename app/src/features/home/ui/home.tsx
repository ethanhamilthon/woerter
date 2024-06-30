import { LoginPage, useAuthStore } from "@/features/auth";
import { CardsList } from "./cards_list";
import { GetAllWord } from "@/api/word";
import { useCardStore } from "..";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";

export function Home() {
  const { state, profile } = useAuthStore();
  const { setCards } = useCardStore();

  if (state === "logged" && profile.languages.length === 0) {
    return <Navigate to="/app/onboard" />;
  }

  useQuery("words", async () => {
    const data = await GetAllWord();
    setCards(data);
    return data;
  });
  return (
    <main className="flex justify-center bg-white">
      <div className="container  flex flex-col gap-8">
        {state === "noinfo" ? (
          <LoginPage />
        ) : (
          <>
            <CardsList />
          </>
        )}
      </div>
    </main>
  );
}
