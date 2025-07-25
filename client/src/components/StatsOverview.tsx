import {
  getTotalGames,
  getTotalRounds,
  getAverageRounds,
  getDecisiveGames,
} from "@/utils/game.util";
import StatCard from "./StatCard";
import { GameSession } from "@/models/game-session.model";

type StatsOverviewProps = {
  gameSessions: GameSession[] | null;
};

export default function StatsOverview({ gameSessions }: StatsOverviewProps) {
  if (gameSessions && gameSessions.length === 0) return null;

  const totalGames = (gameSessions) ? getTotalGames(gameSessions) : 0;
  const totalRounds = (gameSessions) ? getTotalRounds(gameSessions) : 0;
  const avgRounds = (gameSessions) ? getAverageRounds(gameSessions) : 0;
  const decisiveGames = (gameSessions) ? getDecisiveGames(gameSessions) : 0;

  return (
    <section className="mt-16 text-left mb-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Games"
          value={totalGames}
          color="text-blue-400"
        />
        <StatCard
          label="Total Rounds"
          value={totalRounds}
          color="text-green-400"
        />
        <StatCard
          label="Avg Rounds/Game"
          value={avgRounds}
          color="text-yellow-400"
        />
        <StatCard
          label="Decisive Games"
          value={decisiveGames}
          color="text-purple-400"
        />
      </div>
    </section>
  );
}
