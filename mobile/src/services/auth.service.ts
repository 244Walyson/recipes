import axios from "axios";
import { ICreadentials } from "../interfaces/auth/access-token/credentials.interface";
import { API_URL } from "../utils/system";
import { IAccessToken } from "../interfaces/auth/access-token/acces-token.interface";
import { jwtDecode } from "jwt-decode";
import { storeUserID } from "./user.service";
import { storeToken } from "./token.service";

export const getAccessToken = async (credentials: ICreadentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/token`, credentials);
    const accessToken = response.data;
    await storeToken(accessToken);
    const decoded = await decodeAccessToken(accessToken.access_token);
    if (decoded) {
      await storeUserID(decoded.sub);
    }
    return accessToken;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh-token`, {
      refresh_token: refreshToken,
    });
    const accessToken = response.data;
    await storeToken(accessToken);
    const decoded = await decodeAccessToken(accessToken.access_token);
    if (decoded) {
      await storeUserID(decoded.sub);
    }
    return accessToken;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const getRecoverPasswordToken = async (email: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/recover-password/token/${email}`
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
    const response = await axios.post(`${API_URL}/auth/redirect/google`, data);
    const accessToken = response.data;
    await storeToken(accessToken);
    const decoded = await decodeAccessToken(accessToken.access_token);
    if (decoded) {
      await storeUserID(decoded.sub);
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
    const response = await axios.post(`${API_URL}/auth/redirect/github`, {
      code,
    });
    const accessToken = response.data;
    await storeToken(accessToken);
    const decoded = await decodeAccessToken(accessToken.access_token);
    if (decoded) {
      await storeUserID(decoded.sub);
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
