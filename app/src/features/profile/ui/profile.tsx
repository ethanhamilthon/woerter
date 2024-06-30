import { useAuthStore } from "@/features/auth";
import { deleteCookie } from "@/utils/cookie_get";
import { Capitalize } from "@/utils/string";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const { profile } = useAuthStore();
  const { cleanUser } = useAuthStore();
  const navigate = useNavigate();
  function Logout() {
    deleteCookie("Authorization");
    cleanUser();
    navigate("/app");
  }
  return (
    <main className="container flex flex-col items-center justify-center p-16 py-8 gap-6">
      <img
        src={profile.user.avatar}
        alt={profile.user.name}
        className="rounded-full w-16 h-16"
      />
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-semibold text-zinc-700">
          {profile.user.full_name}
        </h2>
        <span className="font-light text-zinc-400">{profile.user.email}</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-lg font-medium text-zinc-600">Ваши языки:</span>
        <div className="flex gap-2">
          {profile.languages.map((lang) => {
            return (
              <div
                key={lang.name}
                className="py-2 px-4 text-sm bg-zinc-100 rounded-md text-zinc-500"
              >
                {lang.name}
              </div>
            );
          })}
        </div>
      </div>
      <span className="text-lg font-medium text-zinc-600 mt-12">
        Язык системы: {Capitalize(profile.user.language)}
      </span>
      <button
        onClick={Logout}
        className="px-6 py-3 bg-red-600 text-white rounded-lg"
      >
        Выйти из системы
      </button>
    </main>
  );
}
