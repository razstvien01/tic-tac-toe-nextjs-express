export type GameSessionDto = {
  id: number;
  player1Name: string;
  player2Name: string;
  startTime: string;
  endTime: string;
  rounds: {
    winner?: string;
    moves?: string[];
  }[];
  finalScore: {
    player1Wins: number;
    player2Wins: number;
    draws: number;
  };
};