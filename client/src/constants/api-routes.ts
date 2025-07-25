const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const API_ROUTES = {
  SAVE_SESSION: `${BASE_URL}/api/save-session/`,
  GET_SESSIONS: `${BASE_URL}/api/get-sessions/`,
};
