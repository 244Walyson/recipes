import { API_URL } from "../utils/system";
import { IReciperequest } from "../interfaces/recipe/recipe-request.interface";
import { IFindAllFilters } from "../interfaces/recipe/find-all-filters.interface";
import axiosIntance from "./interceptors";

export const getRecipeById = async (id: string) => {
  try {
    const response = await axiosIntance.get(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRecipes = async (
  params: IFindAllFilters,
  page?: number,
  limit?: number
) => {
  try {
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", page.toString());
    if (limit) queryParams.append("limit", limit.toString());

    if (params.name) queryParams.append("name", params.name);
    if (params.ingredients)
      queryParams.append("ingredients", params.ingredients.join(","));
    if (params.mealTypes)
      queryParams.append("mealTypes", params.mealTypes.join(","));
    if (params.price) queryParams.append("price", params.price.join(","));
    if (params.servingCount)
      queryParams.append("servingCount", params.servingCount);
    if (params.allergens)
      queryParams.append("allergens", params.allergens.join(","));
    if (params.preparationTime)
      queryParams.append("preparationTime", params.preparationTime.toString());
    if (params.orderBy) queryParams.append("orderBy", params.orderBy);

    console.log("queryParams", queryParams.toString());

    const response = await axiosIntance.get(
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
    const response = await axiosIntance.get(
      `${API_URL}/recipes/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingecipes = async () => {
  try {
    const response = await axiosIntance.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createRecipe = async (recipe: IReciperequest) => {
  try {
    const response = await axiosIntance.post(`${API_URL}/recipes`, recipe);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateRecipe = async (
  recipeId: string,
  recipe: IReciperequest
) => {
  try {
    const response = await axiosIntance.put(
      `${API_URL}/recipes/${recipeId}`,
      recipe
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const viewRecipe = async (recipeId: string) => {
  try {
    const response = await axiosIntance.post(
      `${API_URL}/recipes/views/${recipeId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const favouriteRecipe = async (recipeId: string) => {
  try {
    const response = await axiosIntance.post(
      `${API_URL}/recipes/favourites/${recipeId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unfavouriteRecipe = async (recipeId: string) => {
  try {
    const response = await axiosIntance.delete(
      `${API_URL}/recipes/favourites/${recipeId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecipesFavouritedByUserId = async (userId: string) => {
  try {
    const response = await axiosIntance.get(
      `${API_URL}/recipes/favourites/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRecipe = async (recipeId: string) => {
  try {
    const response = await axiosIntance.delete(
      `${API_URL}/recipes/${recipeId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
