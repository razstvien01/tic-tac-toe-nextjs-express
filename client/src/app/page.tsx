import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe - Home</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-4">Tic Tacc Toe</h1>
        <Link href="/new-game" className="px-4 py-2 bg blue-500 text-white rounded hover:bg-blue-600">
          Start New Game
        </Link>
      </main>
    </>
  );
}
