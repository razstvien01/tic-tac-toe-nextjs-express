import Head from "next/head";
import { Play } from "lucide-react";
import { GradientButton, StatsOverview } from "@/components";
import Footer from "@/components/Footer";
import { GameSessionDto } from "@/dtos/game-session.dto";
import { GameHistorySection } from "@/components/GameHistorySection";
import { getGameSession } from "@/services/sessionService";
import { mapGameSessionsDtoToModels } from "@/mappers/game-session.mapper";

export default async function Home() {
  const loading = false;
  const gameSessionDto: GameSessionDto[] = await getGameSession();
  const gameSessions = mapGameSessionsDtoToModels(gameSessionDto);

  return (
    <>
      <Head>
        <title>Ultimate Tic Tac Toe - Challenge Your Friends!</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-6 relative overflow-hidden pt-16">
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

          <div className="flex justify-center mb-6">
            <div className="flex items-start md:items-center gap-2 text-yellow-400 text-sm max-w-md text-left">
              <span>
                Note: Backend runs on a free instance and may be slow to start
                after inactivity.
              </span>
            </div>
          </div>

          {/* CTA */}
          <GradientButton href="/new-game" icon={<Play />}>
            Start New Game
          </GradientButton>

          <StatsOverview gameSessions={gameSessions} />

          <GameHistorySection gameSessions={gameSessions} loading={loading} />

          <Footer />
        </div>
      </main>
    </>
  );
}
