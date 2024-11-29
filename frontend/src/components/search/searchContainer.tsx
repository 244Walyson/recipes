"use client";

import React, { useState, useEffect } from "react";
import Card from "./searchcard";
import RecipeModal from "../RecipeModal";
import { getRecipeById, getRecipes } from "@/services/recipe.service";
import SearchFilter from "./searchFilter";
import { IFindAllFilters } from "@/types"; // Supondo que a interface esteja em um arquivo de tipos

const SearchContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<IFindAllFilters>({});
  const [debouncedFilters, setDebouncedFilters] = useState<IFindAllFilters>({});

  // Debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(timer); // Clear the timeout on re-render
    };
  }, [filters]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes(debouncedFilters);
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    if (Object.keys(debouncedFilters).length > 0) {
      fetchRecipes();
    } else {
      setLoading(false);
    }
  }, [debouncedFilters]);

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
        <>
          <div className="flex flex-col">
            <div className="grid grid-flow-row gap-4">
              {recipes.map((recipe, index) => (
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
        </>
      )}
    </div>
  );
};

export default SearchContainer;
