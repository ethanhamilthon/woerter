import { Header } from "@/features/home";

export function Landing() {
  return (
    <>
      <Header></Header>
      <main className="container flex items-center flex-col gap-6 justify-center mt-12">
        <h1 className="text-4xl font-bold text-zinc-700 text-center">
          Запомни слова
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
            навсегда
          </span>{" "}
          через ИИ!
        </h1>
        <h3 className="font-light text-zinc-600 text-center">
          Лучший ИИ сервис для изучение
          <br />
          другого языка. Начни сейчас бесплатно!
        </h3>
        <div className="flex gap-4">
          <button className="py-2 px-4 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-200 duration-150">
            Попробвать
          </button>
          <button className="py-2 px-4 bg-purple-600 text-white border border-purple-200 rounded-lg hover:bg-purple-700 duration-150">
            Перейти
          </button>
        </div>
        <div className="w-4/5 bg-gray-200 rounded-xl h-64"></div>
      </main>
    </>
  );
}
