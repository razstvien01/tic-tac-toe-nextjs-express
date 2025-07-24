"use client";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Gamepad2, Home } from "lucide-react";
import { GameModeSelector, PlayerInput, StartGameButton } from "@/components";

export default function NewGame() {
  const router = useRouter();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [gameMode, setGameMode] = useState("classic");

  const isReady = player1.trim() && player2.trim();

  const startGame = () => {
    if (isReady) {
      router.push(
        `/gameplay?player1=${encodeURIComponent(
          player1
        )}&player2=${encodeURIComponent(player2)}&mode=${gameMode}`
      );
    }
  };

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

          {/* Game Mode */}
          <GameModeSelector selected={gameMode} onSelect={setGameMode} />

          {/* Player Input */}
          <div className="space-y-4 mb-6">
            <PlayerInput
              label="Player 1 (X)"
              value={player1}
              onChange={setPlayer1}
              playerIconColor="text-blue-400"
              confirmationText="will play as X"
            />
            <PlayerInput
              label="Player 2 (O)"
              value={player2}
              onChange={setPlayer2}
              playerIconColor="text-green-400"
              confirmationText="will play as O"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <StartGameButton onClick={startGame} isReady={!!isReady} />
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
