import { useAuthStore } from "@/features/auth";
import { Link } from "react-router-dom";

export function CreateCard() {
  const { profile } = useAuthStore();
  return (
    <div className="w-full  flex justify-between  rounded-xl items-center">
      <h2 className="text-2xl font-medium text-zinc-900 leading-tight">
        Hi, {profile.name}!
      </h2>
      <Link
        to={"/create"}
        className="flex justify-center py-3 px-6 bg-purple-700 items-center h-full text-white rounded-2xl"
      >
        + Создать карточку
      </Link>
    </div>
  );
}
