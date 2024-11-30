"use client";

import React from "react";
import Image from "next/image";
import { IRecipeResponse } from "@/interfaces/recipe/recipe-response.interface";

type RecipeCardProfileProps = {
  recipe: IRecipeResponse;
  onDelete: (recipeId: string) => void;
  onClick: (recipeId: string) => void;
};

const RecipeCardProfile = ({
  recipe,
  onDelete,
  onClick,
}: RecipeCardProfileProps) => {
  return (
    <div>
      {recipe && (
        <div
          className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-10 min-w-96 "
          onClick={() => onClick(recipe.id)}
        >
          <div className="w-full p-4 h-64 rounded-xl items-center justify-center overflow-hidden">
            <Image
              className="object-cover w-full h-full rounded-lg"
              src={recipe.imgUrl ?? "/cookImage.png"}
              alt={recipe.name}
              width={400}
              height={400}
            />
          </div>

          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{recipe.name}</div>
            <p className="text-gray-700 text-base">
              <strong>Tempo de preparo:</strong> {recipe.preparationTime}{" "}
              minutos
            </p>
            <p className="text-gray-700 text-base">
              <strong>Porções:</strong> {recipe.servingCount}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Estimativa de custo:</strong> R$
              {recipe.costEstimate?.toFixed(2)}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Dicas adicionais:</strong> {recipe.additionalTips}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Alérgenos:</strong> {recipe.allergens?.join(", ")}
            </p>
            <div className="text-gray-700 text-base mt-2">
              <strong>Macronutrientes:</strong>
              <ul>
                <li>Proteína: {recipe.macronutrients?.protein}g</li>
                <li>Carboidratos: {recipe.macronutrients?.carbs}g</li>
                <li>Gordura: {recipe.macronutrients?.fat}g</li>
              </ul>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-end">
            <button
              onClick={() => onDelete(recipe.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Excluir Receita
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCardProfile;
