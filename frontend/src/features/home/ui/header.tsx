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
          <div className="flex items-center gap-4">
            <img
              src={profile.user.avatar}
              alt={profile.user.name}
              className="w-8 h-8 rounded-full bg-zinc-800"
            />
            <div className="flex flex-col">
              <span className="font-bold">{profile.user.full_name}</span>
              <span className="text-xs text-zinc-600">
                {profile.user.email}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
