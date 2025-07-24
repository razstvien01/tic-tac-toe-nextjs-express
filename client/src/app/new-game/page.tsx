"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewGame() {
  const router = useRouter();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const startGame = () => {
    if (player1 && player2) {
      router.push(`/gameplay?player1=${player1}&player2=${player2}`);
    }
  };

  return (
    <>
      <Head>
        <title>Start New Game</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4">
        <h1 className="text-2xl font-bold mb-4 text-[var(--primary)]">
          Enter Player Names
        </h1>
        <input
          className="border p-2 mb-2 w-64 bg-[var(--hover)] text-white border-gray-600 rounded"
          placeholder="Player 1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
        <input
          className="border p-2 mb-4 w-64 bg-[var(--hover)] text-white border-gray-600 rounded"
          placeholder="Player 2"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />

        <button
          onClick={startGame}
          className="px-4 py-2 bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white rounded"
        >
          Start
        </button>
      </main>
    </>
  );
}
