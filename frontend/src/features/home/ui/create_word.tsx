import { Link } from "react-router-dom";

export function CreateCard() {
  return (
    <div className="w-full  flex justify-between gap-16 p-6 bg-purple-700 rounded-xl">
      <h2 className="text-4xl font-bold text-white leading-tight">
        С возвращением! Сегодня
        <br />
        очень хороший день чтобы
        <br />
        учить новые слова
      </h2>
      <Link
        to={"/create"}
        className="flex-1 flex justify-center items-center h-full bg-white rounded-2xl text-xl"
      >
        + Создать карточку
      </Link>
    </div>
  );
}
