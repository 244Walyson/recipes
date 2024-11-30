import { ICreadentials } from "../interfaces/auth/access-token/credentials.interface";
import { IAccessToken } from "../interfaces/auth/access-token/acces-token.interface";
import { jwtDecode } from "jwt-decode";
import { storeUserID } from "./user.service";
import { storeToken } from "./token.service";
import axiosInstance from "./interceptors";

export const resetPassword = async (
  email: string,
  token: string,
  password: string
): Promise<void> => {
  try {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    const response = await axiosInstance.post("/auth/reset-password", {
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

export const getAccessToken = async (credentials: ICreadentials) => {
  try {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    const response = await axiosInstance.post(`/auth/token`, credentials);
    const accessToken = response.data;
    storeToken(accessToken);
    const decoded = await decodeAccessToken(accessToken.access_token);
    if (decoded) {
      storeUserID(decoded.sub);
    }
    return accessToken;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.post(`/auth/refresh-token`, {
      refresh_token: refreshToken,
    });
    const accessToken = response.data;
    storeToken(accessToken);
    const decoded = await decodeAccessToken(accessToken.access_token);
    if (decoded) {
      storeUserID(decoded.sub);
    }
    return accessToken;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const getRecoverPasswordToken = async (email: string) => {
  try {
    const response = await axiosInstance.post(
      `/auth/recover-password/token/${email}`
    );
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const getAccessTokenWithGoogleToken = async (
  idToken: string
): Promise<IAccessToken> => {
  try {
    const data = {
      idToken: idToken,
    };
    const response = await axiosInstance.post(`/auth/redirect/google`, data);
    const accessToken = response.data;
    storeToken(accessToken);
    const decoded = await decodeAccessToken(accessToken.access_token);
    if (decoded) {
      storeUserID(decoded.sub);
    }
    return accessToken;
  } catch (error) {
    console.error("Erro ao enviar tokens para o backend:", error);
    throw error;
  }
};

export const getAccessTokenWithGithubCode = async (
  code: string
): Promise<IAccessToken> => {
  try {
    const response = await axiosInstance.post(`/auth/redirect/github`, {
      code,
    });
    const accessToken = response.data;
    storeToken(accessToken);
    const decoded = await decodeAccessToken(accessToken.access_token);
    if (decoded) {
      storeUserID(decoded.sub);
    }
    return accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to get access token. Please try again later.");
  }
};

interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export function decodeAccessToken(token: string): JwtPayload | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar o token", error);
    return null;
  }
}
