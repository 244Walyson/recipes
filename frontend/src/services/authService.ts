import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
});

export const resetPassword = async (
  email: string,
  token: string,
  password: string
): Promise<void> => {
  try {
    const response = await api.post("/auth/reset-password", {
      email,
      token,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error("Failed to reset password. Please try again later.");
  }
};

export const getAccessToken = async (code: string): Promise<string> => {
  try {
    const response = await api.post("/auth/redirect/github", { code });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to get access token. Please try again later.");
  }
};
