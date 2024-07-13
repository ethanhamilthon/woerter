import { GetSearchWordResult } from "@/api/word";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WordType } from "@/types/words";
import { ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";

export function SearchWord() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<WordType[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  function handleChange(value: string) {
    setSearchTerm(value);
  }

  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm) {
        try {
          const data = await GetSearchWordResult(debouncedSearchTerm);
          setResults(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setResults([]);
      }
    })();
  }, [debouncedSearchTerm]);
  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-2 border rounded-lg text-zinc-500">
          <Search size={16} />
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-start rounded-lg">
        <DialogHeader>
          <DialogTitle>Search a word</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full relative">
            <Search
              size={16}
              className="absolute top-1/2 -translate-y-1/2 left-2 text-zinc-300"
            />
            <input
              className="p-2 w-full border border-zinc-400 pl-8 rounded-xl"
              type="text"
              placeholder="Search your word :)"
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <span className="text-sm font-light text-zinc-500">
            Found : {results.length}
          </span>
          <div className="w-full h-72 overflow-y-scroll flex flex-col gap-2">
            {results.map((word) => {
              return <SearchWordCard key={word.id} word={word} />;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchWordCard(props: { word: WordType }) {
  return (
    <div className="w-full p-3 flex items-center justify-between rounded-md border border-zinc-300">
      <div className="flex flex-col">
        <span className="text-xs font-light text-zinc-500">
          {props.word.to_language}
        </span>
        <span className="text-zinc-700 font-semibold">{props.word.title}</span>
      </div>
      <Link
        to={"/app/dic/" + props.word.id}
        className="p-3 rounded-lg bg-violet-600"
      >
        <ChevronRight className="text-white" size={16} />
      </Link>
    </div>
  );
}
