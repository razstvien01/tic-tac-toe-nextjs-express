import ENV from "@/constants/env";
import { GameSessionDto } from "@/dtos/game-session.dto";
import axios from "axios";

export async function GET(): Promise<Response> {
  try {
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

    // const response = await axios.get(
    //   `${ENV.EXPRESS_BACKEND_URL}/api/game-sessions`
    // );
    // console.log("dAta from express:", response);

    return new Response(JSON.stringify(gameSessionDtos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("GET /gamesessions error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
