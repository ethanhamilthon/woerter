import { useAuthStore } from "@/features/common";
import { ChangeLanguage, useI8 } from "@/features/international";
import { deleteCookie } from "@/utils/cookie";
import { Capitalize } from "@/utils/string";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const { profile, cleanUser } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useI8();
  function Logout() {
    deleteCookie("Authorization");
    cleanUser();
    navigate("/app");
  }
  return (
    <main className="container p-0 flex justify-center">
      <div className="w-full max-w-lg flex flex-col p-6 gap-2 items-center justify-center">
        <div className="flex items-center p-3 gap-4 rounded-lg justify-between bg-zinc-50 w-full">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-zinc-700">
              {profile.user.full_name}
            </h2>
            <span className="font-light text-sm text-zinc-400">
              {profile.user.email}
            </span>
          </div>
          <img
            src={profile.user.avatar}
            alt={profile.user.name}
            className="rounded-full w-12 h-12"
          />
        </div>

        <div className="flex flex-col gap-2 w-full p-3 rounded-lg bg-zinc-50">
          <span className="font-light text-sm text-zinc-400">
            {t.PROFILE.TLANGS}
          </span>
          <div className="flex gap-2">
            {profile.languages.map((lang) => {
              return (
                <div
                  key={lang.name}
                  className="py-1 px-4 text-sm bg-white rounded-md text-zinc-600 border border-zinc-300"
                >
                  {Capitalize(lang.name)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex w-full p-3 rounded-lg bg-zinc-50 items-center justify-between">
          <span className="font-medium text-zinc-600">{t.PROFILE.OSLANG}</span>
          <span className="font-light text-zinc-400">
            {Capitalize(profile.user.language)}
          </span>
        </div>

        <button
          onClick={Logout}
          className="px-6 py-3 w-full bg-red-600 text-white rounded-lg mt-24"
        >
          {t.PROFILE.LOGOUT}
        </button>
        <ChangeLanguage />
      </div>
    </main>
  );
}
