"use client";

import Head from "next/head";
import Link from "next/link";
import { Trophy, Play, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ultimate Tic Tac Toe - Challenge Your Friends!</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-[var(--foreground)] p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center slide-up">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 gradient-text">
              TIC TAC TOE
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-2">
              🎮 Ultimate Gaming Experience
            </p>
            <p className="text-lg text-gray-400">
              Challenge your friends in the classic strategy game!
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl">
            <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Multiplayer</h3>
              <p className="text-gray-400 text-sm">Play with friends locally</p>
            </div>
            <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] hover:border-green-500 transition-all duration-300 hover:transform hover:scale-105">
              <Trophy className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Score Tracking</h3>
              <p className="text-gray-400 text-sm">
                Keep track of wins & draws
              </p>
            </div>
            <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] hover:border-yellow-500 transition-all duration-300 hover:transform hover:scale-105">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Fast & Fun</h3>
              <p className="text-gray-400 text-sm">Quick rounds, endless fun</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/new-game"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 pulse-glow"
          >
            <Play className="w-6 h-6 group-hover:animate-pulse" />
            Start New Game
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </Link>

          {/* Game Stats Preview */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-2">
              🏆 Ready to become the champion?
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <span>⚡ Quick Setup</span>
              <span>🎯 Strategic Gameplay</span>
              <span>🏅 Achievement System</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
