import { ENV } from "@/constants";
import axios from "axios";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    console.log(body);

    await axios.post(`${ENV.EXPRESS_BACKEND_URL}/api/save-session`, body);

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
