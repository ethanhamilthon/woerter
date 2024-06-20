import { useAuthStore } from "@/features/auth";
import { Link } from "react-router-dom";

export function Header() {
  const { profile, state } = useAuthStore();
  return (
    <header className="w-full flex justify-center py-4 bg-white px-4">
      <div className="container flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-zinc-900 cursor-pointer"
        >
          Woerter
        </Link>
        {state === "logged" && (
          <div className="flex items-center gap-2">
            <img
              src={profile.user.avatar}
              alt={profile.user.name}
              className="w-8 h-8 rounded-full bg-zinc-800"
            />
            <span className="text-lg font-semibold text-zinc-700">
              Hi, {profile.user.name}!
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
