import axios from "axios";
import { API_URL } from "../utils/system";
import { IRecipeResponse } from "../interfaces/recipe/recipe-response.interface";
import { IReciperequest } from "../interfaces/recipe/recipe-request.interface";
import { IFindAllFilters } from "../interfaces/recipe/find-all-filters.interface";

export const getRecipeById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRecipes = async (params: IFindAllFilters) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.name) queryParams.append("name", params.name);
    if (params.cuisineStyles)
      queryParams.append("cuisineStyles", params.cuisineStyles.join(","));
    if (params.servingCount)
      queryParams.append("servingCount", params.servingCount);
    if (params.allergens)
      queryParams.append("allergens", params.allergens.join(","));
    if (params.totalTime)
      queryParams.append("totalTime", params.totalTime.toString());
    if (params.viewCount)
      queryParams.append("viewCount", params.viewCount.toString());
    if (params.likeCount)
      queryParams.append("likeCount", params.likeCount.toString());

    const response = await axios.get(
      `${API_URL}/recipes?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRecipesByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRecipesByCuisineStyle = async (cuisineStyles: string) => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createRecipe = async (recipe: IReciperequest) => {
  try {
    const response = await axios.post(`${API_URL}/recipes`, recipe);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
