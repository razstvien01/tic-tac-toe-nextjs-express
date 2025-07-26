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
    const result = await axios.get(API_ROUTES.GET_SESSIONS);

    console.log("Fetched game sessions:", result.data?.length || 0);

    return result.data;
  } catch {
    return null;
  }
};
