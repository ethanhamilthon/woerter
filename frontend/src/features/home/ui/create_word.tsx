import { useAuthStore } from "@/features/auth";
import { Link } from "react-router-dom";

export function CreateCard() {
  const { profile } = useAuthStore();
  return (
    <div className="w-full  flex justify-between  rounded-xl items-center px-4">
      <h2 className="text-lg sm:text-2xl font-semibold text-zinc-900 leading-tight">
        Hi, {profile.name}!
      </h2>
      <Link
        to={"/create"}
        className="flex justify-center font-medium text-xs sm:text-base px-6 py-3 sm:py-3 sm:px-6 bg-purple-700 items-center h-full text-white rounded-2xl"
      >
        + Создать карточку
      </Link>
    </div>
  );
}
