import { useAuthStore } from "@/features/auth";

export function Header() {
  const { profile } = useAuthStore();
  return (
    <header className="w-full flex justify-center py-4 bg-white">
      <div className="container flex justify-between items-center">
        <h2>Logo</h2>
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-8 h-8 rounded-full bg-zinc-800"
          />
          <div className="flex flex-col">
            <span className="font-bold">{profile.name}</span>
            <span className="text-xs text-zinc-600">{profile.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
