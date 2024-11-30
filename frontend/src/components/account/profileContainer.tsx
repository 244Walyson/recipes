"use client";

import React, { useState, useEffect } from "react";
import { getUser } from "@/services/user.service";
import RecipeCardProfile from "./recipeCard";
import {
  deleteRecipe,
  getRecipeById,
  getRecipesByUserId,
} from "@/services/recipe.service";
import Image from "next/image";
import { IRecipeResponse } from "@/interfaces/recipe/recipe-response.interface";
import { IPaginatedResponse } from "@/interfaces/paginated-response.interface";
import { IUserResponse } from "@/interfaces/user/user-response.interface";
import RecipeModal from "../RecipeModal";

const ProfileContainer = () => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [recipes, setRecipes] = useState<IPaginatedResponse<IRecipeResponse>>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<
    IRecipeResponse | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = await localStorage.getItem("userID");
        if (userID) {
          const userData = await getUser(userID);
          setUser(userData);
          fetchUserRecipes(userData.id);
        } else {
          setError("User not found in storage");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchUserRecipes = async (userId: string) => {
    try {
      const userRecipes = await getRecipesByUserId(userId);
      console.log("userRecipes", userRecipes);
      setRecipes(userRecipes);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      setError("Error fetching user recipes");
    }
  };

  const handleSelectedRecipe = async (recipeId: string) => {
    try {
      const recipe = await getRecipeById(recipeId);
      setSelectedRecipe(recipe);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Error fetching recipe");
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      await deleteRecipe(recipeId);
      fetchUserRecipes(user?.id ?? "");
      setIsModalOpen(true);
      setSuccess("Recipe deleted successfully");
    } catch {
      setError("Error Deleting recipe");
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col p-20 w-full items-center justify-center border-b">
        <div className="rounded-full w-80 h-80 bg-white overflow-hidden flex items-center justify-center">
          <Image
            src={user?.imgUrl ?? "/default-avatar.png"}
            width={300}
            height={300}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl">{user?.name}</h1>
          <h2>{user?.username}</h2>
          <p>{user?.email}</p>
          <p className="text-gray-500">
            Joined on: {new Date(user?.createdAt ?? "").toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-4 mt-4 flex-wrap items-center justify-center">
          {recipes && recipes.data?.length > 0 ? (
            recipes.data?.map((recipe: IRecipeResponse) => (
              <RecipeCardProfile
                key={recipe.id}
                recipe={recipe}
                onClick={(recipeId) => handleSelectedRecipe(recipeId)}
                onDelete={(recipeId) => handleDeleteRecipe(recipeId)}
              />
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      </div>

      {selectedRecipe && (
        <RecipeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          recipe={selectedRecipe}
        />
      )}
    </div>
  );
};

export default ProfileContainer;
