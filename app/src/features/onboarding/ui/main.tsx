import { OnboardUpdate } from "@/api/me";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/main";

import { useI8 } from "@/features/international";
import { OsLanguages, TargetLanguages } from "@/features/international";

export function Onboarding() {
  const [step, setStep] = useState<"os" | "target">("os");
  const [osLang, setOsLang] = useState("");
  const { setLanguage } = useI8();
  const navigate = useNavigate();
  function OsStepHandle(value: string) {
    setOsLang(value);
    setLanguage(value);
    setStep("target");
  }
  async function TargetStepHandle(value: string[]) {
    if (osLang === "" || value.length === 0) {
      return;
    }
    try {
      await OnboardUpdate({
        os_language: osLang,
        target_languages: value,
      });
      queryClient.invalidateQueries("getme");
      navigate("/app?state=done");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="flex justify-center container flex-col gap-8 py-12">
      {step === "os" && <OsLanguage Next={OsStepHandle} />}
      {step === "target" && <TargetLanguage Complete={TargetStepHandle} />}
    </main>
  );
}

export function OsLanguage(props: { Next: (value: string) => void }) {
  const [selected, setSelected] = useState("");
  const { setLanguage, t } = useI8();
  useEffect(() => {
    if (selected !== "") {
      setLanguage(selected);
    }
  }, [selected]);
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-xl sm:text-3xl text-zinc-700 font-bold">
          1/2. {t.ONBOARD.THIS_H1}
        </h2>
        <p className="leading-5 text-sm font-light text-purple-700 bg-purple-100 rounded-lg p-4">
          {t.ONBOARD.THIS_P1}
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
          {t.ONBOARD.THIS_B1}
        </button>
      </div>
    </>
  );
}

export function TargetLanguage(props: {
  Complete: (selected: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const { t } = useI8();
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-xl sm:text-3xl text-zinc-700 font-bold">
          2/2. {t.ONBOARD.ANOTHER_H1}
        </h2>
        <p className="leading-5 text-sm font-light text-purple-700 bg-purple-100 rounded-lg p-4">
          {t.ONBOARD.ANOTHER_P1}
          {selected.length === 0
            ? t.ONBOARD.ANOTHER_P2
            : t.ONBOARD.ANOTHER_P3 + selected.join(", ")}
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
          {t.ONBOARD.ANOTHER_B1}
        </button>
      </div>
    </>
  );
}
