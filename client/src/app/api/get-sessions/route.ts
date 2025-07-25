import ENV from "@/constants/env";
import axios from "axios";

export async function GET(): Promise<Response> {
  try {
    const response = await axios.get(
      `${ENV.EXPRESS_BACKEND_URL}/api/game-sessions`
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
