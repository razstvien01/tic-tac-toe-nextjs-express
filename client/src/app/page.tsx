"use client";

import Head from "next/head";
import Link from "next/link";
import { Trophy, Play, Calendar, Crown } from "lucide-react";
import { GradientButton } from "@/components";
import Footer from "@/components/Footer";
import { GameSessionDto } from "@/dtos/game-session.dto";
import { GameSession } from "@/models/game-session.model";
import { mapGameSessionsDtoToModels } from "@/mappers/game-session.mapper";
import { formatDate } from "@/utils/date.utils";

export default function Home() {
  const loading = false;

  const gameSessionDtos: GameSessionDto[] = [
    {
      id: 1,
      player1Name: "You",
      player2Name: "AI",
      startTime: "2025-07-21T12:30:00Z",
      endTime: "2025-07-21T12:45:00Z",
      rounds: [{}, {}, {}],
      finalScore: {
        player1Wins: 1,
        player2Wins: 1,
        draws: 1,
      },
    },
    {
      id: 2,
      player1Name: "Charlie",
      player2Name: "Dana",
      startTime: "2025-07-22T14:00:00Z",
      endTime: "2025-07-22T14:15:00Z",
      rounds: [{}],
      finalScore: {
        player1Wins: 0,
        player2Wins: 1,
        draws: 0,
      },
    },
  ];

  const gameSessions: GameSession[] =
    mapGameSessionsDtoToModels(gameSessionDtos);

  const getSessionWinner = (session: GameSession) => {
    const { player1Wins, player2Wins } = session.finalScore;
    if (player1Wins === player2Wins) return "Tie";
    return player1Wins > player2Wins
      ? session.player1Name
      : session.player2Name;
  };

  return (
    <>
      <Head>
        <title>Ultimate Tic Tac Toe - Challenge Your Friends!</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center w-full max-w-6xl">
          {/* Hero */}
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            TIC TAC TOE
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            🎮 Ultimate Gaming Experience
          </p>
          <p className="text-gray-400 mb-8">
            Challenge your friends in the classic strategy game!
          </p>

          {/* CTA */}
          <GradientButton href="/new-game" icon={<Play />}>
            Start New Game
          </GradientButton>

          {/* Stats Overview */}
          {gameSessions.length > 0 && (
            <section className="mt-16 text-left mb-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {gameSessions.length}
                  </div>
                  <div className="text-sm text-gray-400">Total Games</div>
                </div>
                <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {gameSessions.reduce(
                      (sum, session) => sum + session.rounds.length,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-400">Total Rounds</div>
                </div>
                <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {Math.round(
                      gameSessions.reduce(
                        (sum, session) => sum + session.rounds.length,
                        0
                      ) / gameSessions.length
                    )}
                  </div>
                  <div className="text-sm text-gray-400">Avg Rounds/Game</div>
                </div>
                <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {
                      gameSessions.filter((s) => getSessionWinner(s) !== "Tie")
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-400">Decisive Games</div>
                </div>
              </div>
            </section>
          )}

          {/* Game History Section */}
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
                      <span>
                        {formatDate(session.endTime || session.startTime)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
}
