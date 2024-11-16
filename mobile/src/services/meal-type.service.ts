import axios from "axios";
import { API_URL } from "../utils/system";

export const getMealTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/meal-types`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
