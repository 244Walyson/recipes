import axios from "axios";
import { removeTokens, storeToken } from "./token.service";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(new Error(error.message));
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await axios.post(`/auth/refresh-token`, {
            refresh_token: refreshToken,
          });

          const accessToken = response.data;

          storeToken(accessToken);

          error.config.headers[
            "Authorization"
          ] = `Bearer ${accessToken.access_token}`;

          return axios(error.config);
        } catch (refreshError) {
          console.error("Erro ao tentar atualizar o token:", refreshError);
        }
      }
      removeTokens();
    }

    return Promise.reject(new Error(error.message));
  }
);

export default axiosInstance;
