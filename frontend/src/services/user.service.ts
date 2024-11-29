import axiosIntance from "./interceptors";
import { IUserRequest } from "../interfaces/user/user-request.interface";

export const createUser = async (user: IUserRequest) => {
  try {
    const response = await axiosIntance.post(`/users`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axiosIntance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id: string, user: IUserRequest) => {
  try {
    const response = await axiosIntance.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const storeUserID = async (id: string) => {
  localStorage.setItem("userID", id);
};

export const getStoredUserID = async () => {
  return localStorage.getItem("userID");
};

export const removeStoredUserID = async () => {
  localStorage.removeItem("userID");
};
