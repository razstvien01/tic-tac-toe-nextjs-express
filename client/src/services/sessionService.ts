import { API_ROUTES } from "@/constants";
import { InGameSession } from "@/models/in-game-session.model";
import axios from "axios";

export const saveGameSession = async (session: InGameSession) => {
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
  try {
    const result = await axios.get(API_ROUTES.GET_SESSIONS);
    return result.data;
  } catch {
    return null;
  }
};
