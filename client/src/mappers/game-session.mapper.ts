import { GameSessionDto } from "@/dtos/game-session.dto";
import { GameSession } from "@/models/game-session.model";

export function mapGameSessionDtoToModel(dto: GameSessionDto): GameSession {
  return {
    ...dto,
    startTime: new Date(dto.startTime),
    endTime: new Date(dto.endTime),
  };
}

export function mapGameSessionsDtoToModels(dtos: GameSessionDto[]) {
  return dtos?.map(mapGameSessionDtoToModel);
}
