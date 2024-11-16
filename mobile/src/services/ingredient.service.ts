import axios from "axios";
import { API_URL } from "../utils/system";

export const getIngredients = async () => {
  try {
    const response = await axios.get(`${API_URL}/ingredients`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
