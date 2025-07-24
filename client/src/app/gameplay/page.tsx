"use client";

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

  const checkWinner = (b: string[]) => {
    for (const [a, bIdx, c] of winPatterns) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) return b[a];
    }
    return b.every((cell) => cell) ? "Draw" : null;
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
        return {
          ...prev,
          [result as "X" | "O"]: prev[result as "X" | "O"] + 1,
        };
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
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-4">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">
        Tic Tac Toe
      </h1>
      <p className="mb-4 text-gray-300">
        {player1} (X) vs {player2} (O)
      </p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 flex items-center justify-center text-3xl font-bold rounded-lg cursor-pointer bg-[var(--hover)] hover:bg-[var(--primary)] transition-colors"
          >
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <div className="text-lg font-semibold text-[var(--secondary)] mb-2">
          {winner === "Draw" ? "It’s a draw!" : `${winner} wins this round!`}
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button
          onClick={resetBoard}
          className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl"
        >
          Continue
        </button>
        <button
          onClick={stopGame}
          className="px-4 py-2 bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white rounded-xl"
        >
          Stop
        </button>
      </div>

      <div className="text-sm text-gray-400 text-center">
        <p>
          {player1} Wins: {score.X}
        </p>
        <p>
          {player2} Wins: {score.O}
        </p>
        <p>Draws: {score.Draws}</p>
      </div>
    </main>
  );
}
