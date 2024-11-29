import { IAccessToken } from "../interfaces/auth/access-token/acces-token.interface";

export const storeToken = (accessToken: IAccessToken) => {
  localStorage.setItem("accessToken", accessToken.access_token);
  localStorage.setItem("refreshToken", accessToken.refresh_token);
  localStorage.setItem("expiresIn", accessToken.expires_in.toString());
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getStoredRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const getStoredExpiresIn = (): string | null => {
  return localStorage.getItem("expiresIn");
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expiresIn");
};
