import { useI8 } from "@/features/international";

export function Landing() {
  return (
    <>
      <Hero />
      <Reviews />
    </>
  );
}

function Hero() {
  const { t, setLanguage } = useI8();
  return (
    <main className="container flex items-center flex-col gap-6 justify-center my-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-zinc-700 text-center">
        {t.LAND.H1_P1}
        <br />
        <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
          {t.LAND.H1_P2}
        </span>{" "}
        {t.LAND.H1_P3}
      </h1>
      <h3 className="font-light sm:text-base text-sm text-zinc-600 text-center">
        {t.LAND.T1_P1}
        <br />
        {t.LAND.T1_P2}
      </h3>
      <div className="flex gap-4">
        <button
          onClick={() => setLanguage("russian")}
          className="py-2 px-4 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-200 duration-150"
        >
          {t.LAND.B1}
        </button>
        <button
          onClick={() => setLanguage("english")}
          className="py-2 px-4 bg-violet-600 text-white border border-purple-200 rounded-lg hover:bg-violet-700 duration-150"
        >
          {t.LAND.B2}
        </button>
      </div>
      <div className="w-4/5 bg-gray-200 rounded-xl h-64"></div>
    </main>
  );
}

function Reviews() {
  const { t } = useI8();
  const placeholder = [
    {
      name: "Мария К.",
      words: 372,
      emoji: "🤩",
      text: "Этот сервис потрясающий! Карточки с новыми словами помогают мне изучать английский язык быстрее и эффективнее. Очень довольна результатами!",
    },
    {
      name: "Алексей В.",
      words: 511,
      emoji: "🤯",
      text: "Идеальный инструмент для изучения немецкого языка. Карточки создаются автоматически и очень удобны для ежедневной практики. Спасибо за отличный сервис!",
    },
    {
      name: "Елена М.",
      words: 290,
      emoji: "😍",
      text: "Люблю ваш сервис! ИИ генерирует карточки быстро и точно, помогая мне учить новые слова на испанском. Это действительно работает!",
    },
  ];
  return (
    <section className="w-full bg-violet-500 py-6 flex flex-col justify-center items-center gap-8 px-4">
      <span className=" text-2xl text-white font-bold">{t.LAND.H2}</span>
      <div className="container flex flex-wrap gap-4">
        {placeholder.map((ph) => {
          return <Review key={ph.name} {...ph} />;
        })}
      </div>
    </section>
  );
}

function Review(props: {
  name: string;
  words: number;
  text: string;
  emoji: string;
}) {
  return (
    <div className="flex-1 min-w-72 bg-white border border-zinc-300 rounded-xl flex flex-col p-3 gap-3 relative">
      <span className="text-4xl absolute -top-3 -right-3 transform -rotate-12">
        {props.emoji}
      </span>
      <p className="text-xs font-light text-zinc-500">{props.text}</p>
      <div className="w-full flex justify-between">
        <span className="font-medium text-zinc-700">{props.name}</span>
        <span className="text-sm font-light text-zinc-700">
          {props.words} слов.
        </span>
      </div>
    </div>
  );
}
