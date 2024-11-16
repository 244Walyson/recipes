import axios from "axios";
import { IUserRequest } from "../interfaces/user/user-request.interface";
import { API_URL } from "../utils/system";

export const createUser = async (user: IUserRequest) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
