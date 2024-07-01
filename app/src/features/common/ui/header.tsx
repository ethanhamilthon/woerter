import { Link, useLocation } from "react-router-dom";
import { Play, Swords, CircleUserRound } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuthStore } from "..";

export function Header() {
  const { profile, state } = useAuthStore();
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment.length > 0);
  const firstSegment = (pathSegments.length > 0 ? pathSegments[1] : "") || "";

  return (
    <>
      <header className="w-full flex justify-center py-6 bg-white border-b border-b-zinc-300">
        <div className="w-full shadow-2xl shadow-black/100 bg-white flex fixed left-0 bottom-0 sm:hidden z-50">
          <Link
            to={"/app"}
            className={cn(
              "flex-1 py-6 justify-center flex gap-2 items-center text-zinc-400",
              {
                " text-zinc-700 font-semibold": firstSegment === "",
              }
            )}
          >
            <Swords
              size={20}
              className={cn("text-zinc-400", {
                "text-zinc-700": firstSegment === "",
              })}
            />
            Words
          </Link>
          <Link
            to={"/app/play"}
            className={cn(
              "flex-1 py-6 justify-center flex gap-2 items-center text-zinc-400",
              {
                " text-zinc-700 font-semibold":
                  firstSegment === "play" || firstSegment === "goplay",
              }
            )}
          >
            <Play
              size={20}
              className={cn("text-zinc-400", {
                "text-zinc-700":
                  firstSegment === "play" || firstSegment === "goplay",
              })}
            />
            Play
          </Link>
          <Link
            to={"/app/profile"}
            className={cn(
              "flex-1 py-6 justify-center flex gap-2 items-center text-zinc-400",
              {
                " text-zinc-700 font-semibold": firstSegment === "profile",
              }
            )}
          >
            <CircleUserRound
              size={20}
              className={cn("text-zinc-400", {
                "text-zinc-700": firstSegment === "profile",
              })}
            />
            Profile
          </Link>
        </div>

        <div className="container flex justify-between items-center">
          <Link
            to="/app"
            className="text-3xl font-bold text-zinc-900 cursor-pointer"
          >
            Woerter
          </Link>
          <nav className="items-center gap-8 hidden sm:flex">
            <Link
              to={"/app"}
              className="flex-1 flex justify-center text-zinc-500 hover:text-zinc-700 duration-150"
            >
              Words
            </Link>
            <Link
              to={"/app/play"}
              className="flex-1 flex justify-center text-zinc-500 hover:text-zinc-700 duration-150"
            >
              Play
            </Link>
            <Link
              to={"/app/profile"}
              className="flex-1 flex justify-center text-zinc-500 hover:text-zinc-700 duration-150"
            >
              Profile
            </Link>
          </nav>
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
    </>
  );
}
