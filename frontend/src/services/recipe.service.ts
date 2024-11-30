import { IReciperequest } from "../interfaces/recipe/recipe-request.interface";
import { IFindAllFilters } from "../interfaces/recipe/find-all-filters.interface";
import axiosIntance from "./interceptors";

export const getRecipeById = async (id: string) => {
  try {
    const response = await axiosIntance.get(`/recipes/${id}`);
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

    const response = await axiosIntance.get(
      `/recipes?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRecipesByUserId = async (userId: string) => {
  try {
    const response = await axiosIntance.get(`/recipes/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingecipes = async () => {
  try {
    const response = await axiosIntance.get(`/recipes`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createRecipe = async (recipe: IReciperequest) => {
  try {
    const response = await axiosIntance.post(`/recipes`, recipe);
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
    const response = await axiosIntance.put(`/recipes/${recipeId}`, recipe);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const viewRecipe = async (recipeId: string) => {
  try {
    const response = await axiosIntance.post(`/recipes/views/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const favouriteRecipe = async (recipeId: string) => {
  try {
    const response = await axiosIntance.post(`/recipes/favourites/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unfavouriteRecipe = async (recipeId: string) => {
  try {
    const response = await axiosIntance.delete(
      `/recipes/favourites/${recipeId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecipesFavouritedByUserId = async (userId: string) => {
  try {
    const response = await axiosIntance.get(`/recipes/favourites/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRecipe = async (recipeId: string) => {
  try {
    const response = await axiosIntance.delete(`/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
