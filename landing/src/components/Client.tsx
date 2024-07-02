import React from "react";

export function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-bold text-zinc-700">{count}</span>
      <button
        className="px-6 py-3 bg-violet-600 rounded-lg text-white font-medium"
        onClick={() => setCount((prev) => prev + 1)}
      >
        INCREMENT
      </button>
    </div>
  );
}
