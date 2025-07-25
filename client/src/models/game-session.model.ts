import { FinalScore } from "./final-score.model";
import { Round } from "./round.model";

export type GameSession = {
  id: number;
  player1Name: string;
  player2Name: string;
  startTime: Date;
  endTime: Date;
  rounds: Round[];
  finalScore: FinalScore;
}