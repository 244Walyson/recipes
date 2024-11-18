import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
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
