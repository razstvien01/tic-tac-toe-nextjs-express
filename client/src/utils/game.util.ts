import { GameSession } from "@/models/game-session.model";

export const getSessionWinner = (session: GameSession) => {
  const { player1Wins, player2Wins } = session.finalScore;
  if (player1Wins === player2Wins) return "Tie";
  return player1Wins > player2Wins ? session.player1Name : session.player2Name;
};

export function getTotalGames(gameSessions: GameSession[]): number {
  return gameSessions.length;
}

export function getTotalRounds(gameSessions: GameSession[]): number {
  return gameSessions.reduce((sum, session) => sum + session.rounds.length, 0);
}

export function getAverageRounds(gameSessions: GameSession[]): number {
  const totalGames = getTotalGames(gameSessions);
  const totalRounds = getTotalRounds(gameSessions);
  return totalGames === 0 ? 0 : Math.round(totalRounds / totalGames);
}

export function getDecisiveGames(gameSessions: GameSession[]): number {
  return gameSessions.filter((s) => getSessionWinner(s) !== "Tie").length;
}
