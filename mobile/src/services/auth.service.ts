import axios from "axios";
import { ICreadentials } from "../interfaces/auth/access-token/credentials.interface";
import { API_URL } from "../utils/system";
import * as SecureStore from "expo-secure-store";
import { IAccessToken } from "../interfaces/auth/access-token/acces-token.interface";
import { jwtDecode } from "jwt-decode";

export const getAccessToken = async (credentials: ICreadentials) => {
  console.log(credentials);
  try {
    const response = await axios.post(`${API_URL}/auth/token`, credentials);
    return response.data;
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
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export async function storeAllTokens(accessToken: IAccessToken) {
  await SecureStore.setItemAsync("accessToken", accessToken.access_token);
  await SecureStore.setItemAsync("refreshToken", accessToken.refresh_token);
}

export async function storeAccessToken(token: string) {
  await SecureStore.setItemAsync("accessToken", token);
}

export async function storeRefreshToken(token: string) {
  await SecureStore.setItemAsync("refreshToken", token);
}

export async function getStoredAccessToken() {
  return await SecureStore.getItemAsync("accessToken");
}

export async function getStoredRefreshToken() {
  return await SecureStore.getItemAsync("refreshToken");
}

export async function getStoredExpiresIn() {
  return await SecureStore.getItemAsync("expiresIn");
}

export async function removeAccessToken() {
  await SecureStore.deleteItemAsync("accessToken");
}

export async function removeRefreshToken() {
  await SecureStore.deleteItemAsync("refreshToken");
}

export async function removeExpiresIn() {
  await SecureStore.deleteItemAsync("expiresIn");
}

export async function removeAllTokens() {
  await removeAccessToken();
  await removeRefreshToken();
  await removeExpiresIn();
}

interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export function decodeAccessToken(token: string): JwtPayload | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log("Decoded JWT:", decoded);

    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar o token", error);
    return null;
  }
}
