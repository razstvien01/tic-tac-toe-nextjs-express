"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RotateCcw, Home, Crown, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function Gameplay() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const player1 = searchParams.get("player1") || "Player 1";
  const player2 = searchParams.get("player2") || "Player 2";
  const gameMode = searchParams.get("mode") || "classic";

  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [score, setScore] = useState({ X: 0, O: 0, Draws: 0 });
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [roundNumber, setRoundNumber] = useState(1);
  const [showWinner, setShowWinner] = useState(true);

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  const checkWinner = (b: string[]) => {
    for (const pattern of winPatterns) {
      const [a, bIdx, c] = pattern;
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        setWinningLine(pattern);
        return b[a];
      }
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
      setShowWinner(true);
      const winnerName =
        result === "X" ? player1 : result === "O" ? player2 : "Draw";
      setGameHistory((prev) => [
        ...prev,
        `Round ${roundNumber}: ${winnerName}`,
      ]);

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

  const stopGame = async () => {
    const payload = {
      player1,
      player2,
      gameMode,
      score,
      gameHistory,
      roundsPlayed: roundNumber,
      endedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/save-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Error saving session:", err);
    }

    router.push("/");
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setWinningLine([]);
    setTurn("X");
    setRoundNumber((prev) => prev + 1);
  };

  const getWinnerName = () => {
    if (winner === "X") return player1;
    if (winner === "O") return player2;
    return null;
  };

  const totalGames = score.X + score.O + score.Draws;
  const player1WinRate =
    totalGames > 0 ? Math.round((score.X / totalGames) * 100) : 0;
  const player2WinRate =
    totalGames > 0 ? Math.round((score.O / totalGames) * 100) : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-[var(--foreground)] p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 slide-up">
          <h1 className="text-5xl font-bold gradient-text mb-3">
            Round {roundNumber}
          </h1>
          <div className="flex items-center justify-center gap-6 text-xl">
            <span className="text-blue-400 font-semibold">{player1} (X)</span>
            <span className="text-gray-400 text-2xl">⚔️</span>
            <span className="text-green-400 font-semibold">{player2} (O)</span>
          </div>
        </div>
        {/* Current Turn Indicator */}
        {winner && showWinner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-400 p-8 rounded-2xl max-w-md w-full animate-slide-up relative">
              <button
                onClick={() => setShowWinner(false)}
                className="absolute top-3 right-3 text-yellow-300 hover:text-white transition"
                aria-label="Close winner announcement"
              >
                ✕
              </button>

              <div className="text-center winner-celebration">
                <div className="text-6xl mb-4">
                  {winner === "Draw" ? "🤝" : "🏆"}
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {winner === "Draw"
                    ? "It's a Draw!"
                    : `${getWinnerName()} Wins!`}
                </div>
                <div className="text-lg text-gray-200">
                  {winner === "Draw"
                    ? "Both players played well."
                    : `Congratulations, ${getWinnerName()}!`}
                </div>

                <div className="flex justify-center mt-6 gap-4">
                  <button
                    onClick={() => {
                      resetBoard();
                      setShowWinner(false);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Continue
                  </button>
                  <button
                    onClick={stopGame}
                    className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                  >
                    Stop
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Game Container */}
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full px-4 mb-6">
          {/* Scoreboard Section (Left on large screens) */}
          <div className="w-full md:w-1/3 space-y-4">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-6 rounded-2xl border border-blue-500/30 text-center">
              <div className="text-blue-400 text-lg font-semibold mb-2">
                {player1}
              </div>
              <div className="text-4xl font-bold text-blue-400 mb-1">
                {score.X}
              </div>
              <div className="text-sm text-gray-400">
                {player1WinRate}% win rate
              </div>
              <div className="text-xs text-blue-300 mt-1">Playing as X</div>
            </div>

            <div className="bg-gradient-to-r from-gray-500/20 to-gray-600/20 p-6 rounded-2xl border border-gray-500/30 text-center">
              <div className="text-gray-400 text-lg font-semibold mb-2">
                Draws
              </div>
              <div className="text-4xl font-bold text-gray-400 mb-1">
                {score.Draws}
              </div>
              <div className="text-sm text-gray-400">
                Total Games: {totalGames}
              </div>
              <div className="text-xs text-gray-300 mt-1">Fair Play</div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-6 rounded-2xl border border-green-500/30 text-center">
              <div className="text-green-400 text-lg font-semibold mb-2">
                {player2}
              </div>
              <div className="text-4xl font-bold text-green-400 mb-1">
                {score.O}
              </div>
              <div className="text-sm text-gray-400">
                {player2WinRate}% win rate
              </div>
              <div className="text-xs text-green-300 mt-1">Playing as O</div>
            </div>
          </div>

          {/* Game Board (Right on large screens) */}
          <div className="w-full md:w-2/3 max-w-[500px] mt-6">
            <div className="bg-[#1e1e2e] p-4 md:p-6 rounded-2xl shadow-xl border border-white/10">
              <div className="grid grid-cols-3 gap-3">
                {board.map((cell, i) => (
                  <div
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`aspect-square w-full flex items-center justify-center text-5xl font-bold rounded-2xl cursor-pointer transition-all duration-200
            ${
              cell
                ? winningLine.includes(i)
                  ? "bg-yellow-500/30 border-3 border-yellow-400 shadow-lg shadow-yellow-400/50"
                  : cell === "X"
                  ? "bg-blue-500/30 border-3 border-blue-400 shadow-lg shadow-blue-400/30"
                  : "bg-green-500/30 border-3 border-green-400 shadow-lg shadow-green-400/30"
                : "bg-[var(--hover)] hover:bg-[var(--primary)] hover:scale-105 border-3 border-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-blue-400/20"
            } ${cell ? "bounce-in" : ""}`}
                  >
                    {cell && (
                      <span
                        className={`${
                          cell === "X" ? "text-blue-400" : "text-green-400"
                        } drop-shadow-lg`}
                      >
                        {cell}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={resetBoard}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            {winner ? "Next Round" : "Reset Board"}
          </button>
          <Link
            href="/new-game"
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Target className="w-5 h-5" />
            New Game
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-8 py-4 bg-[var(--card)] hover:bg-[var(--hover)] border-2 border-[var(--border)] text-gray-300 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>
        </div>
        {/* Game Statistics and History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Game Statistics */}
          <div className="bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)]">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-400" />
              Game Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-[var(--hover)] rounded-xl">
                <div className="text-2xl font-bold text-blue-400">
                  {totalGames}
                </div>
                <div className="text-sm text-gray-400">Total Games</div>
              </div>
              <div className="text-center p-4 bg-[var(--hover)] rounded-xl">
                <div className="text-2xl font-bold text-green-400">
                  {roundNumber}
                </div>
                <div className="text-sm text-gray-400">Current Round</div>
              </div>
              <div className="text-center p-4 bg-[var(--hover)] rounded-xl">
                <div className="text-2xl font-bold text-purple-400 capitalize">
                  {gameMode}
                </div>
                <div className="text-sm text-gray-400">Game Mode</div>
              </div>
              <div className="text-center p-4 bg-[var(--hover)] rounded-xl">
                <div className="text-2xl font-bold text-yellow-400">
                  {Math.max(score.X, score.O) > 0
                    ? Math.round(
                        (Math.max(score.X, score.O) / totalGames) * 100
                      )
                    : 0}
                  %
                </div>
                <div className="text-sm text-gray-400">Best Win Rate</div>
              </div>
            </div>
          </div>

          {/* Game History */}
          <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              Recent Results
            </h3>

            {gameHistory.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {gameHistory
                  .slice(-5)
                  .reverse()
                  .map((result, index) => (
                    <div
                      key={index}
                      className="text-sm p-2 bg-[var(--hover)] rounded-lg"
                    >
                      {result}
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No recent games played yet.
              </p>
            )}
          </div>

          {/* Achievement Progress */}
          <div className="md:col-span-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-500/30">
            <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-3">
              🎯 Achievement Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-purple-500/20 rounded-xl">
                <div className="text-lg font-bold text-purple-400">
                  {totalGames >= 5 ? "✅" : `${totalGames}/5`}
                </div>
                <div className="text-gray-400">Games Played</div>
              </div>
              <div className="text-center p-3 bg-purple-500/20 rounded-xl">
                <div className="text-lg font-bold text-purple-400">
                  {Math.max(score.X, score.O) >= 3
                    ? "✅"
                    : `${Math.max(score.X, score.O)}/3`}
                </div>
                <div className="text-gray-400">Wins for Champion</div>
              </div>
              <div className="text-center p-3 bg-purple-500/20 rounded-xl">
                <div className="text-lg font-bold text-purple-400">
                  {score.Draws > 0 ? "✅" : "0/1"}
                </div>
                <div className="text-gray-400">First Draw</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
