import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Play,
  Swords,
  CircleUserRound,
  FilePlus2,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import { useAuthStore } from "..";
import { useI8 } from "@/features/international";
import { LanguageType } from "@/types/user";
import { Capitalize } from "@/utils/string";

export function Header() {
  const { profile, state } = useAuthStore();
  const { t } = useI8();
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment.length > 0);
  const firstSegment = (pathSegments.length > 0 ? pathSegments[1] : "") || "";

  return (
    <header className="w-full flex justify-center py-6 bg-white border-b border-b-zinc-300">
      <div className="w-full shadow-2xl shadow-black/100 bg-white flex justify-around fixed left-0 bottom-0 md:hidden z-50">
        <Link
          to={"/app"}
          className={cn(
            "py-6 justify-center flex gap-1 items-center text-zinc-400",
            {
              " text-zinc-700 font-semibold": firstSegment === "",
            }
          )}
        >
          <Swords
            size={18}
            className={cn("text-zinc-400", {
              "text-zinc-700": firstSegment === "",
            })}
          />
          {t.HEADER.WORDS}
        </Link>
        <Link
          to={"/app/play"}
          className={cn(
            "py-6 justify-center flex gap-1 items-center text-zinc-400",
            {
              " text-zinc-700 font-semibold":
                firstSegment === "play" || firstSegment === "goplay",
            }
          )}
        >
          <Play
            size={18}
            className={cn("text-zinc-400", {
              "text-zinc-700":
                firstSegment === "play" || firstSegment === "goplay",
            })}
          />
          {t.HEADER.PLAY}
        </Link>
        <Link
          to={"/app/profile"}
          className={cn(
            "py-6 justify-center flex gap-1 items-center text-zinc-400",
            {
              " text-zinc-700 font-semibold": firstSegment === "profile",
            }
          )}
        >
          <CircleUserRound
            size={18}
            className={cn("text-zinc-400", {
              "text-zinc-700": firstSegment === "profile",
            })}
          />
          {t.HEADER.PROFILE}
        </Link>
      </div>

      <div className="container flex justify-between items-center">
        <Link
          to="/app"
          className="text-3xl font-bold text-zinc-900 cursor-pointer"
        >
          Woerter
        </Link>
        <nav className="items-center gap-12 hidden md:flex">
          <Link
            to={"/app"}
            className=" flex justify-center items-center gap-2 text-zinc-500 hover:text-zinc-700 duration-150"
          >
            <Swords size={18} className="text-zinc-400" />
            {t.HEADER.WORDS}
          </Link>
          <Link
            to={"/app/play"}
            className="flex justify-center items-center gap-2 text-zinc-500 hover:text-zinc-700 duration-150"
          >
            <Play size={18} className="text-zinc-400" />
            {t.HEADER.PLAY}
          </Link>
          <Link
            to={"/app/profile"}
            className=" flex justify-center items-center gap-2 text-zinc-500 hover:text-zinc-700 duration-150"
          >
            <CircleUserRound size={18} className="text-zinc-400" />
            {t.HEADER.PROFILE}
          </Link>
        </nav>
        {state === "logged" &&
          (profile.languages.length === 1 ? (
            <DirectToAsk language={profile.languages[0].name} />
          ) : (
            <MenuToAsk languages={profile.languages} />
          ))}
      </div>
    </header>
  );
}

function DirectToAsk(props: { language: string }) {
  const { t } = useI8();
  return (
    <Link
      to={"/app/ask/" + props.language}
      className="flex justify-center font-medium text-sm gap-1 px-5 py-3 sm:py-3 sm:px-6 bg-purple-700 items-center text-white rounded-lg"
    >
      <FilePlus2 size={16} />
      <span>{t.HEADER.NEW}</span>
    </Link>
  );
}

function MenuToAsk(props: { languages: LanguageType[] }) {
  const { t } = useI8();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex justify-center font-medium text-sm gap-1 px-5 py-3 sm:py-3 sm:px-6 bg-purple-700 items-center text-white rounded-lg">
          <FilePlus2 size={16} />
          <span>{t.HEADER.NEW}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-6 shadow-2xl">
        <DropdownMenuLabel>{t.HEADER.CHOOSE}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {props.languages.map((language) => {
          return (
            <DropdownMenuItem
              onClick={() => {
                navigate("/app/ask/" + language.name);
              }}
              key={language.id}
              className="py-2 flex items-center justify-between cursor-pointer"
            >
              <span>{Capitalize(language.name)}</span>
              <ChevronRight size={20} className="text-zinc-500" />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
