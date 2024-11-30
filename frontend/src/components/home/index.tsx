"use client";

import React, { useEffect, useState } from "react";
import Grettings from "./Grettings";
import TrendingCard from "./TrendingCard";
import { getRecipeById, getRecipes } from "@/services/recipe.service";
import { IRecipeResponse } from "@/interfaces/recipe/recipe-response.interface";
import RecipeModal from "../RecipeModal";

const HomePage = () => {
  const [recipes, setRecipes] = useState<IRecipeResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<
    IRecipeResponse | undefined
  >();

  const loadRecipes = async () => {
    const params = { orderBy: "favouriteCount" };
    try {
      const response = await getRecipes(params, 0, 9);
      console.log("response", response);
      setRecipes(response.data);
    } catch (error) {
      console.error("Erro ao carregar as receitas:", error);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handlerecipeClick = async (recipeId: string) => {
    try {
      const recipe = await getRecipeById(recipeId);
      setSelectedRecipe(recipe);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao abrir a receita:", error);
    }
  };
  return (
    <div className="flex ">
      <div className="w-4/5">
        <Grettings />
        <div className="mt-10" />
        <h1 className="text-xl mb-6">Mais populares</h1>

        <div className="flex flex-wrap gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe: IRecipeResponse) => (
              <TrendingCard
                key={recipe.id}
                data={recipe}
                onClick={(recipeId: string) => handlerecipeClick(recipeId)}
              />
            ))
          ) : (
            <p>Nenhuma receita encontrada</p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-1/5 gap-y-6"></div>

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

export default HomePage;
