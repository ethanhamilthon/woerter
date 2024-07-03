import { CardsList } from "./cards_list";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/common";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export function Home() {
  const { state, profile } = useAuthStore();
  const query = useQueryParams();
  if (
    state === "logged" &&
    profile.languages.length === 0 &&
    query.get("state") !== "done"
  ) {
    return <Navigate to="/app/onboard" />;
  }
  if (query.get("state") === "done") {
    window.location.href = "/app/";
  }
  return (
    <main className="flex justify-center bg-white">
      <div className="container  flex flex-col gap-8">
        <CardsList />
      </div>
    </main>
  );
}
