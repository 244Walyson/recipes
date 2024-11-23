import axiosIntance from "./interceptors";
import { API_URL } from "../utils/system";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { ICuisineStyle } from "../interfaces/cuisine-style/cousine-styles.interface";

export const getCuisineStyles = async (): Promise<
  IPaginatedResponse<ICuisineStyle>
> => {
  try {
    const response = await axiosIntance.get(`${API_URL}/cuisine-styles`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
