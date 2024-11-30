import { IFindAllFilters } from "../interfaces/recipe/find-all-filters.interface";
import { makeRequest } from "./helpers";
import { API_URL } from "../utils/system";
import { IReciperequest } from "../interfaces/recipe/recipe-request.interface";
export const getRecipeById = async (id: string) => {
  return await makeRequest("get", `${API_URL}/recipes/${id}`);
};

export const getRecipes = async (
  params: IFindAllFilters,
  page?: number,
  limit?: number
) => {
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

  return await makeRequest(
    "get",
    `${API_URL}/recipes?${queryParams.toString()}`
  );
};

export const createRecipe = async (recipe: IReciperequest) => {
  return await makeRequest("post", `${API_URL}/recipes`, recipe);
};

export const getRecipesByUserId = async (userId: string) => {
  return await makeRequest("get", `${API_URL}/recipes/user/${userId}`);
};

export const getRecipesFavouritedByUserId = async (userId: string) => {
  return await makeRequest("get", `${API_URL}/recipes/favourites/${userId}`);
};

export const updateRecipe = async (
  recipeId: string,
  recipe: IReciperequest
) => {
  return await makeRequest("put", `${API_URL}/recipes/${recipeId}`, recipe);
};

export const favouriteRecipe = async (recipeId: string) => {
  return await makeRequest("post", `${API_URL}/recipes/favourites/${recipeId}`);
};

export const unfavouriteRecipe = async (recipeId: string) => {
  return await makeRequest(
    "delete",
    `${API_URL}/recipes/favourites/${recipeId}`
  );
};

export const viewRecipe = async (recipeId: string) => {
  return await makeRequest("post", `${API_URL}/recipes/views/${recipeId}`);
};

export const deleteRecipe = async (recipeId: string) => {
  return await makeRequest("delete", `${API_URL}/recipes/${recipeId}`);
};
