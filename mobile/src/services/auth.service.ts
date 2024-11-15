import axios from "axios";
import { ICreadentials } from "../interfaces/auth/access-token/credentials.interface";
import { API_URL } from "../utils/system";
import * as SecureStore from "expo-secure-store";
import { IAccessToken } from "../interfaces/auth/access-token/acces-token.interface";

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

export async function storeAccessToken(token: string) {
  await SecureStore.setItemAsync("accessToken", token);
}

export async function storeRefreshToken(token: string) {
  await SecureStore.setItemAsync("refreshToken", token);
}

export async function getStoredAccessToken() {
  return await SecureStore.getItemAsync("accessToken");
}

async function getStoredRefreshToken() {
  return await SecureStore.getItemAsync("refreshToken");
}
