"use client";

import Head from "next/head";
import { Trophy, Play, Users, Zap } from "lucide-react";
import { FeatureCard, GradientButton } from "@/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ultimate Tic Tac Toe - Challenge Your Friends!</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-[var(--foreground)] p-4 relative overflow-hidden">
        {/* Background blur effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center slide-up">
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
            <FeatureCard
              icon={<Users />}
              title="Multiplayer"
              description="Play with friends locally"
              colorClass="blue"
            />
            <FeatureCard
              icon={<Trophy />}
              title="Score Tracking"
              description="Keep track of wins & draws"
              colorClass="green"
            />
            <FeatureCard
              icon={<Zap />}
              title="Fast & Fun"
              description="Quick rounds, endless fun"
              colorClass="yellow"
            />
          </div>

          {/* Call to Action */}
          <GradientButton href="/new-game" icon={<Play />}>
            Start New Game
          </GradientButton>

          {/* Footer Text */}
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
