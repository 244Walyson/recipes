import axios from "axios";
import { API_URL } from "../utils/system";

export const getMealTypes = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/meal-types?name=${name}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createMealType = async (name: string) => {
  try {
    const response = await axios.post(`${API_URL}/meal-types`, { name });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
