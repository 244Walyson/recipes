import axios from "axios";
import { API_URL } from "../utils/system";

export const getIngredients = async (name?: string) => {
  try {
    const queryParams = new URLSearchParams();

    if (name) queryParams.append("name", name);

    const response = await axios.get(
      `${API_URL}/ingredients?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
