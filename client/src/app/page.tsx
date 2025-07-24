import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe - Home</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-4">
        <h1 className="text-4xl font-bold mb-6 text-[var(--primary)]">
          Tic-Tac-Toe Game
        </h1>
        <Link
          href="/new-game"
          className="px-6 py-3 bg-[var(--secondary)] hover:bg-[var(--hover)] text-white rounded-xl"
        >
          Start New Game
        </Link>
      </main>
    </>
  );
}
