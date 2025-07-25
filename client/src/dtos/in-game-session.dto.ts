export type InGameSessionDto = {
  player1: string;
  player2: string;
  mode: string;
  score: {
    X: number;
    O: number;
    Draws: number;
  };
  history: string[];
  roundsPlayed: number;
  endedAt: string;
};