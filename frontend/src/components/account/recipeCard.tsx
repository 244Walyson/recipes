"use client";

import React, { useState } from "react";
import ProfilePhoto from "./profilePhoto";
import Image from "next/image";

const RecipeCardProfile = () => {
  const [recipe, setRecipe] = useState({
    name: "Delicious Pancakes",
    preparationTime: 20,
    imgUrl: "https://chat-kanban.s3.us-east-1.amazonaws.com/1732037836068.jpg",
    macronutrients: {
      protein: 5,
      carbs: 30,
      fat: 10,
    },
    servingCount: 4,
    costEstimate: 10.5,
    additionalTips: "Serve with fresh fruit and syrup for extra flavor.",
    allergens: ["gluten", "dairy"],
  });

  // Função para excluir a receita
  const handleDeleteRecipe = () => {
    setRecipe(null); // Remove a receita da exibição
    alert("Receita excluída!");
  };

  return (
    <div>
      {recipe && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-10">
          <div className="w-full p-4 h-64 rounded-xl items-center justify-center overflow-hidden">
            <Image
              className="object-cover w-full h-full rounded-lg"
              src={recipe.imgUrl}
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
              {recipe.costEstimate.toFixed(2)}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Dicas adicionais:</strong> {recipe.additionalTips}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Alérgenos:</strong> {recipe.allergens.join(", ")}
            </p>
            <div className="text-gray-700 text-base mt-2">
              <strong>Macronutrientes:</strong>
              <ul>
                <li>Proteína: {recipe.macronutrients.protein}g</li>
                <li>Carboidratos: {recipe.macronutrients.carbs}g</li>
                <li>Gordura: {recipe.macronutrients.fat}g</li>
              </ul>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-end">
            <button
              onClick={handleDeleteRecipe}
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
