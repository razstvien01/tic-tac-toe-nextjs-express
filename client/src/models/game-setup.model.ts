import { GameSetupDto } from "@/dtos/game-setup.dto";

export class GameSetup {
  constructor(
    public player1: string,
    public player2: string,
    public mode: string
  ) {}

  static fromDto(dto: GameSetupDto) {
    return new GameSetup(dto.player1, dto.player2, dto.mode);
  }

  isValid(): boolean {
    return this.player1.trim() !== "" && this.player2.trim() !== "";
  }

  toQueryParams(): string {
    return `player1=${encodeURIComponent(
      this.player1
    )}&player2=${encodeURIComponent(this.player2)}&mode=${this.mode}`;
  }
}
