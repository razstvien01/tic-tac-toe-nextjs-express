import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewGame() {
  const router = useRouter();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const startGame = () => {
    if (player1 && player2) {
      router.push({
        pathname: "/gameplay",
        query: { player1, player2 },
      });
    }
  };

  return (
    <>
      <Head>
        <title>Start New Game</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-4">
        <h1 className="text-3xl mb-4 text-[var(--primary)]">
          Enter Player Names
        </h1>
        <input
          className="mb-2 p-2 rounded-xl bg-[var(--hover)] text-white"
          placeholder="Player 1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
        <input
          className="mb-4 p-2 rounded-xl bg-[var(--hover)] text-white"
          placeholder="Player 2"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-[var(--secondary)] hover:bg-[var(--hover)] rounded-xl"
          onClick={startGame}
        >
          Start
        </button>
      </main>
    </>
  );
}
