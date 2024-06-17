import { GetWord } from "@/api/word";
import { CardType, Header } from "@/features/home";
import { getCookieValue } from "@/utils/cookie_get";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";

export function WordPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState<CardType | null>(null);
  useEffect(() => {
    const token = getCookieValue("Authorization");
    if (token === null) {
      return;
    }
    if (id === undefined) {
      navigate("/");
      return;
    }
    GetWord(token, id).then((data) => {
      setWord(data);
    });
  }, []);
  return (
    <>
      <Header />
      <main className="w-full flex justify-center mt-6">
        {word && (
          <div className="container flex flex-col p-6 gap-6 relative">
            <Link
              to={"/edit/" + id}
              className="w-8 h-8 bg-zinc-100 border border-zinc-200 text-zinc-400 cursor-pointer hover:text-zinc-700 duration-200 active:scale-90 flex justify-center items-center rounded absolute top-4 right-4"
            >
              <Pencil />
            </Link>
            <h2 className="text-2xl font-semibold text-zinc-800">
              {word.title}
            </h2>
            <p className="text-zinc-600 whitespace-pre-line">
              {word.description}
            </p>
          </div>
        )}
      </main>
    </>
  );
}
