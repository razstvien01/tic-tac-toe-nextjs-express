"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Gamepad2, ArrowRight, Home, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NewGame() {
  const router = useRouter();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [gameMode, setGameMode] = useState("classic");

  const startGame = () => {
    if (player1 && player2) {
      router.push(
        `/gameplay?player1=${encodeURIComponent(
          player1
        )}&player2=${encodeURIComponent(player2)}&mode=${gameMode}`
      );
    }
  };

  const isReady = player1.trim() && player2.trim();

  return (
    <>
      <Head>
        <title>Setup New Game - Ultimate Tic Tac Toe</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-[var(--foreground)] p-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 w-full max-w-md slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold gradient-text">Game Setup</h1>
            </div>
            <p className="text-gray-400">
              Enter player names to begin the battle!
            </p>
          </div>

          {/* Game Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Game Mode
            </label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setGameMode("classic")}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  gameMode === "classic"
                    ? "border-purple-500 bg-purple-500/20 text-purple-300"
                    : "border-gray-600 bg-[var(--card)] hover:border-purple-400"
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold">🎯 Classic Mode</div>
                  <div className="text-sm text-gray-400">
                    Traditional 3x3 grid gameplay
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Player Input Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Player 1 (X)
              </label>
              <input
                className="w-full p-4 bg-[var(--card)] border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                placeholder="Enter Player 1 name..."
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                maxLength={20}
              />
              {player1 && (
                <div className="mt-2 text-sm text-blue-400 bounce-in">
                  ✓ {player1} will play as X
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Player 2 (O)
              </label>
              <input
                className="w-full p-4 bg-[var(--card)] border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                placeholder="Enter Player 2 name..."
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                maxLength={20}
              />
              {player2 && (
                <div className="mt-2 text-sm text-green-400 bounce-in">
                  ✓ {player2} will play as O
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={startGame}
              disabled={!isReady}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                isReady
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105 pulse-glow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isReady ? (
                <>
                  <span>Start Battle</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <span>Enter Both Player Names</span>
              )}
            </button>

            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--card)] hover:bg-[var(--hover)] border border-[var(--border)] text-gray-300 rounded-xl transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Tips */}
          <div className="mt-8 p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">
              💡 Pro Tips:
            </h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Use memorable names for better experience</li>
              <li>• X always goes first in classic mode</li>
              <li>• Scores are tracked throughout the session</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
