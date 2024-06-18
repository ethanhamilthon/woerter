import { OnboardUpdate } from "@/api/me";
import { Header } from "@/features/home";
import { cn } from "@/utils/cn";
import { getCookieValue } from "@/utils/cookie_get";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/main";
import { OsLanguages, TargetLanguages } from "@/assets/oslanguages";

export function Onboarding() {
  const [step, setStep] = useState<"os" | "target">("os");
  const [osLang, setOsLang] = useState("");
  const navigate = useNavigate();
  function OsStepHandle(value: string) {
    setOsLang(value);
    setStep("target");
  }
  async function TargetStepHandle(value: string[]) {
    if (osLang === "" || value.length === 0) {
      console.log("1");
      return;
    }
    const token = getCookieValue("Authorization");
    if (token === null) {
      console.log("2");
      return;
    }
    const req = await OnboardUpdate(token, {
      os_language: osLang,
      target_languages: value,
    });
    if (!req.ok) {
      console.log("3");
      return;
    }
    queryClient.invalidateQueries("getme");
    navigate("/");
  }
  return (
    <>
      <Header />
      <main className="flex justify-center w-full">
        <div className="container w-full">
          {step === "os" && <OsLanguage Next={OsStepHandle} />}
          {step === "target" && <TargetLanguage Complete={TargetStepHandle} />}
        </div>
      </main>
    </>
  );
}

export function OsLanguage(props: { Next: (value: string) => void }) {
  const [selected, setSelected] = useState("");
  return (
    <div className="w-full flex flex-col justify-center px-6 gap-8 py-12">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-xl sm:text-3xl text-zinc-700 font-bold">
          1/2. Выберите ваш родной язык:
        </h2>
        <p className="leading-5 text-sm font-light text-purple-700 bg-purple-100 rounded-lg p-4">
          Выберите язык, на котором вы полностью разговариваете. Все интерфейсы
          системы, все описание слов будут на этом языке. Вы сможете сменить
          язык только один раз в течение 30 дней.
        </p>
      </div>
      <div className="w-full flex flex-col gap-4">
        {OsLanguages.map((lang) => {
          return (
            <div
              key={lang.value}
              className={cn(
                "flex items-center gap-8 p-3 sm:p-4 rounded-xl border  border-zinc-300 bg-zinc-100 cursor-pointer",
                {
                  "border border-purple-400 bg-purple-500 ":
                    selected === lang.value,
                }
              )}
              onClick={() => setSelected(lang.value)}
            >
              <img
                src={lang.icon}
                alt={lang.value}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span
                className={cn(
                  "text-base sm:text-xl font-medium text-zinc-500",
                  {
                    "text-white": selected === lang.value,
                  }
                )}
              >
                {lang.text}
              </span>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-end">
        <button
          disabled={selected === ""}
          onClick={() => props.Next(selected)}
          className={cn("py-4 bg-purple-700 rounded-xl px-8 text-white", {
            "bg-zinc-400 cursor-not-allowed": selected === "",
          })}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}

export function TargetLanguage(props: {
  Complete: (selected: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="w-full flex flex-col justify-center px-6 gap-8 py-12">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-xl sm:text-3xl text-zinc-700 font-bold">
          2/2. Выберите языков, которых вы хотите изучать:
        </h2>
        <p className="leading-5 text-sm font-light text-purple-700 bg-purple-100 rounded-lg p-4">
          Выберите только те языков, которых вы реально хотите изучать.{" "}
          {selected.length === 0
            ? "Вы пока не выбрали ничего."
            : "Вы выбрали: " + selected.join(", ")}
        </p>
      </div>
      <div className="w-full flex flex-col gap-4">
        {TargetLanguages.map((lang) => {
          return (
            <div
              key={lang.value}
              className={cn(
                "flex items-center gap-8 p-3 sm:p-4 rounded-xl border  border-zinc-300 bg-zinc-100 cursor-pointer",
                {
                  "border border-purple-400 bg-purple-500 ": selected.includes(
                    lang.value
                  ),
                }
              )}
              onClick={() => {
                if (selected.includes(lang.value)) {
                  setSelected((prev) =>
                    prev.filter((value) => value !== lang.value)
                  );
                } else {
                  setSelected((prev) => [...prev, lang.value]);
                }
              }}
            >
              <img
                src={lang.icon}
                alt={lang.value}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span
                className={cn(
                  "text-base sm:text-xl font-medium text-zinc-500",
                  {
                    "text-white": selected.includes(lang.value),
                  }
                )}
              >
                {lang.text}
              </span>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-end">
        <button
          disabled={selected.length === 0}
          onClick={() => props.Complete(selected)}
          className={cn("py-4 bg-purple-700 rounded-xl px-8 text-white", {
            "bg-zinc-400 cursor-not-allowed": selected.length === 0,
          })}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
