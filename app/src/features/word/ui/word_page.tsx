import { GetWord } from "@/api/word";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import { WordType } from "@/features/home/store/card_store";

export function WordPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState<WordType | null>(null);
  useEffect(() => {
    if (id === undefined) {
      navigate("/app");
      return;
    }
    GetWord(id).then((data) => {
      setWord(data);
    });
  }, []);
  return (
    <>
      <main className="w-full container flex flex-col p-6 gap-6 relative justify-center mt-6">
        {word && (
          <>
            <Link
              to={"/app/edit/" + id}
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
          </>
        )}
      </main>
    </>
  );
}
