import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Glitch Hunters Dashboard
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl">Laissez Faire</div>
          <Link
            href="/dashboard"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          >
            Dashboard'a Git
          </Link>
        </div>
      </div>
    </main>
  );
}
