import { LoginPage, useAuthStore } from "@/features/auth";
import { CardsList } from "./cards_list";
import { GetAllWord } from "@/api/word";
import { useCardStore } from "..";
import { useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export function Home() {
  const { state, profile } = useAuthStore();
  const { setCards } = useCardStore();
  const query = useQueryParams();

  useQuery("words", async () => {
    const data = await GetAllWord();
    setCards(data);
    return data;
  });
  if (
    state === "logged" &&
    profile.languages.length === 0 &&
    query.get("state") !== "done"
  ) {
    return <Navigate to="/app/onboard" />;
  }
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
