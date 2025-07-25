import { InGameSession } from "@/models/in-game-session.model";
import axios from "axios";

export const saveGameSession = async (session: InGameSession) => {
  try {
    await axios.post("/api/save-session", session.toDto(), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error saving session:", error);
    throw error;
  }
};