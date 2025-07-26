import { API_ROUTES } from "@/constants";
import { InGameSession } from "@/models/in-game-session.model";
import axios from "axios";

export const saveGameSession = async (session: InGameSession) => {
  const dto = session.toDto();

  console.log("Saving game session:", dto);
  try {
    await axios.post(API_ROUTES.SAVE_SESSION, session.toDto(), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error saving session:", error);
    throw error;
  }
};

export const getGameSession = async () => {
  console.log("Fetching game sessions from backend...");

  try {
    const res = await fetch(API_ROUTES.GET_SESSIONS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();

    console.log("Fetched game sessions:", data?.length || 0);

    return data;
  } catch {
    return null;
  }
};
