"use client";

import { GameSession } from "@/models/game-session.model";
import { formatDate } from "@/utils/date.utils";
import { getSessionWinner } from "@/utils/game.util";
import { Trophy, Play, Crown, Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";

interface GameHistorySectionProps {
  gameSessions: GameSession[];
  loading: boolean;
}

export const GameHistorySection: React.FC<GameHistorySectionProps> = ({
  gameSessions,
  loading,
}) => {
  return (
    <div className="mb-16 mt-16">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-yellow-400" />
        <h2 className="text-3xl font-bold">Game History</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-yellow-400 to-transparent"></div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading game history...</p>
        </div>
      ) : gameSessions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">
            No Games Played Yet
          </h3>
          <p className="text-gray-400 mb-6">
            Start your first game to see the history here!
          </p>
          <Link
            href="/new-game"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200"
          >
            <Play className="w-5 h-5" />
            Play Your First Game
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameSessions.map((session, index) => (
            <div
              key={session.id}
              className="bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-400">
                    Game #{gameSessions.length - index}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {session.rounds.length} round
                  {session.rounds.length !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-blue-400 font-semibold">
                    {session.player1Name}
                  </span>
                  <span className="text-gray-400">vs</span>
                  <span className="text-green-400 font-semibold">
                    {session.player2Name}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-blue-500/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">
                    {session.finalScore.player1Wins}
                  </div>
                  <div className="text-xs text-gray-400">Wins</div>
                </div>
                <div className="text-center p-2 bg-gray-500/20 rounded-lg">
                  <div className="text-lg font-bold text-gray-400">
                    {session.finalScore.draws}
                  </div>
                  <div className="text-xs text-gray-400">Draws</div>
                </div>
                <div className="text-center p-2 bg-green-500/20 rounded-lg">
                  <div className="text-lg font-bold text-green-400">
                    {session.finalScore.player2Wins}
                  </div>
                  <div className="text-xs text-gray-400">Wins</div>
                </div>
              </div>

              <div className="text-center mb-4">
                {getSessionWinner(session) === "Tie" ? (
                  <div className="text-yellow-400 font-semibold">
                    🤝 Tied Game
                  </div>
                ) : (
                  <div className="text-yellow-400 font-semibold">
                    🏆 {getSessionWinner(session)} Won!
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(session.endTime || session.startTime)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
