import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../utils/system";
import { storeAllTokens } from "./auth.service";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refresh_token: refreshToken,
          });

          const accessToken = response.data;

          await storeAllTokens(accessToken);

          error.config.headers[
            "Authorization"
          ] = `Bearer ${accessToken.access_token}`;

          return axios(error.config);
        } catch (refreshError) {
          console.error("Erro ao tentar atualizar o token:", refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
