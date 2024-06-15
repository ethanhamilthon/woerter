export function LoginPage() {
  return (
    <div className="w-full h-full justify-center items-center flex flex-col gap-12 rounded-xl bg-zinc-100">
      <h2 className="text-balance text-3xl font-bold text-zinc-800 text-center">
        <span className="text-5xl mb-5">🤪</span>
        <br />
        Кажется вы не зашли
        <br /> в систему
      </h2>
      <a
        href="/oauth/google/login"
        className="px-8 py-4 rounded-xl bg-zinc-600 text-white font-medium"
      >
        Continue with Google
      </a>
    </div>
  );
}
