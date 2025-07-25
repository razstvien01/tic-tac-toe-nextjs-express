import { GameSessionDto } from "@/dtos/game-session.dto";

export class InGameSession {
  constructor(
    public player1: string,
    public player2: string,
    public mode: string,
    public score: { X: number; O: number; Draws: number },
    public roundWinners: string[], 
    public totalRounds: number,
    public startTime: string,
    public movesPerRound: string[][] = [], 
    public endTime?: string 
  ) {}

  addRoundMoves(moves: string[]) {
    this.movesPerRound.push(moves);
  }

  toDto(): GameSessionDto {
    return {
      id: Date.now(),
      player1Name: this.player1,
      player2Name: this.player2,
      startTime: this.startTime,
      endTime: this.endTime ?? new Date().toISOString(),
      rounds: this.roundWinners.map((winner, i) => ({
        winner,
        moves: this.movesPerRound[i] ?? [],
      })),
      finalScore: {
        player1Wins: this.score.X,
        player2Wins: this.score.O,
        draws: this.score.Draws,
      },
    };
  }
}
