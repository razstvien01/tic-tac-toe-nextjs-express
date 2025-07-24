"use client";

import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Gameplay() {
  const searchParams = useSearchParams();
  const player1 = searchParams.get("player1") || "Player 1";
  const player2 = searchParams.get("player2") || "Player 2";
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [score, setScore] = useState({ X: 0, O: 0, Draws: 0 });

  const checkWinner = (b: string[]) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, bIdx, c] of winPatterns) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) return b[a];
    }
    if (b.every((cell) => cell)) return "Draw";
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = turn;
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setScore((prev) => {
        if (result === "Draw") return { ...prev, Draws: prev.Draws + 1 };
        return { ...prev, [result]: prev[result as "X" | "O"] + 1 };
      });
    } else {
      setTurn((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setTurn("X");
  };

  const stopGame = () => {
    // Save to DB if needed, then redirect
    window.location.href = "/";
  };

  return (
    <>
      <Head>
        <title>Game On!</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-4">
        <h1 className="text-2xl mb-2 text-[var(--primary)]">Tic Tac Toe</h1>
        <p className="mb-4">
          {player1} (X) vs {player2} (O)
        </p>

        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, i) => (
            <div
              key={i}
              onClick={() => handleClick(i)}
              className="w-24 h-24 flex items-center justify-center bg-[var(--hover)] hover:bg-[var(--primary)] text-2xl font-bold rounded-xl cursor-pointer"
            >
              {cell}
            </div>
          ))}
        </div>

        {winner && (
          <div className="mt-4 text-[var(--secondary)]">
            {winner === "Draw" ? "It's a draw!" : `${winner} wins!`}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={resetBoard}
            className="px-4 py-2 bg-[var(--primary)] rounded-xl hover:bg-[var(--primary-dark)]"
          >
            Continue
          </button>
          <button
            onClick={stopGame}
            className="px-4 py-2 bg-[var(--secondary)] rounded-xl hover:bg-[var(--secondary-dark)]"
          >
            Stop
          </button>
        </div>

        <div className="mt-6 text-sm text-white">
          <p>
            {player1} Wins: {score.X}
          </p>
          <p>
            {player2} Wins: {score.O}
          </p>
          <p>Draws: {score.Draws}</p>
        </div>
      </main>
    </>
  );
}
