"use client";

import React, { useState, useEffect } from "react";
import Card from "./searchcard";
import RecipeModal from "../RecipeModal";
import { getRecipeById, getRecipes } from "@/services/recipe.service";
import SearchFilter from "./searchFilter";
import { IFindAllFilters } from "@/interfaces/recipe/find-all-filters.interface";
import { IRecipeResponse } from "@/interfaces/recipe/recipe-response.interface";

const SearchContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<
    IRecipeResponse | undefined
  >();
  const [recipes, setRecipes] = useState<IRecipeResponse[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<IFindAllFilters>({});
  const [debouncedFilters, setDebouncedFilters] = useState<IFindAllFilters>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [filters]);

  useEffect(() => {
    if (Object.keys(debouncedFilters).length > 0) {
      setLoading(true);
      fetchRecipes(debouncedFilters);
    } else {
      setLoading(false);
    }
  }, [debouncedFilters]);

  useEffect(() => {
    setLoading(true);
    fetchRecipes({});
  }, []);

  const fetchRecipes = async (filters: IFindAllFilters) => {
    try {
      const response = await getRecipes(filters);
      console.log("response", response);
      setRecipes(response.data);
    } catch (error) {
      console.log("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (recipeId: string) => {
    try {
      const recipe = await getRecipeById(recipeId);
      setSelectedRecipe(recipe);
      setIsModalOpen(true);
    } catch (error) {
      console.log("Error fetching recipe details:", error);
    }
  };

  const handleFilterChange = (newFilters: IFindAllFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <SearchFilter onFilterChange={handleFilterChange} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col">
          <div className="grid grid-flow-row gap-4">
            {recipes &&
              recipes.map((recipe: IRecipeResponse, index: number) => (
                <Card
                  key={index}
                  recipe={recipe}
                  onClick={() => openModal(recipe.id)}
                />
              ))}
          </div>

          {selectedRecipe && (
            <RecipeModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              recipe={selectedRecipe}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
