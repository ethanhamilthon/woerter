import { useI8 } from "@/features/international";
import { usePlayStore } from "../store/play_store";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export function GoPlayPage() {
  const { step, card, stepInc, stepDec, cleanCard } = usePlayStore();
  const { t } = useI8();
  const navigate = useNavigate();
  if (card === null) {
    return <Navigate to={"/app/play"} />;
  }

  return (
    <main className="container h-dvh">
      <div className="sticky w-full py-6 flex justify-between items-center top-0 bg-white">
        <button
          disabled={step <= 1}
          onClick={stepDec}
          className="py-3 px-5 text-sm disabled:text-zinc-300 disabled:cursor-not-allowed bg-zinc-100 border border-zinc-300 rounded-xl text-zinc-600"
        >
          {t.GOPLAY.BACK}
        </button>
        <span className="font-semibold flex items-center gap-2">
          <span className="text-2xl text-zinc-700">{step}</span>{" "}
          <span className="text-zinc-400">/ {card?.words.length}</span>
        </span>
        {card !== null && step < card?.words.length ? (
          <button
            disabled={card === null || step >= card?.words.length}
            onClick={stepInc}
            className="py-3 px-5 text-sm bg-purple-600 disabled:bg-purple-400 disabled:cursor-not-allowed rounded-xl text-white"
          >
            {t.GOPLAY.NEXT}
          </button>
        ) : (
          <button
            className="py-3 px-5 text-sm bg-green-600 rounded-xl text-white"
            onClick={() => {
              cleanCard();
              navigate("/app/play");
            }}
          >
            {t.GOPLAY.END}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-6 pb-24">
        <h2 className="text-2xl font-semibold text-zinc-800">
          {card?.words[step - 1].title}
        </h2>
        <p className="text-zinc-600 whitespace-pre-line">
          {card?.words[step - 1].description}
        </p>
      </div>
    </main>
  );
}
