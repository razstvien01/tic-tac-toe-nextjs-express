import { ENV } from "@/constants";
import axios from "axios";

export async function GET(): Promise<Response> {
  console.log("GET /api/game-sessions → Fetching game sessions...");

  try {
    const response = await axios.get(
      `${ENV.EXPRESS_BACKEND_URL}/api/game-sessions`
    );

    console.log(
      `GET /api/game-sessions → Success. Status: ${response.status}, Data length: ${response.data?.length}`
    );

    return new Response(JSON.stringify(response.data), {
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
