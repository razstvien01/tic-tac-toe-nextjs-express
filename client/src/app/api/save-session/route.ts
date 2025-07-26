import { ENV } from "@/constants";
import axios from "axios";

export async function POST(request: Request): Promise<Response> {
  console.log("POST /api/game-sessions → Saving session...");

  try {
    const body = await request.json();
    console.log("POST /api/game-sessions → Request body:", body);

    const res = await axios.post(
      `${ENV.EXPRESS_BACKEND_URL}/api/save-session`,
      body
    );
    console.log(
      "POST /api/game-sessions → Successfully saved. Response:",
      res.status
    );

    return new Response(JSON.stringify({ message: "Session saved" }), {
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
