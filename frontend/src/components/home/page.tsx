"use client";

import React, { useEffect, useState } from "react";
import Grettings from "./Grettings";
import StatsCard from "./StatsCard";
import TrendingCard from "./TrendingCard";
import { getRecipes } from "@/services/recipe.service";
import { IRecipeResponse } from "@/interfaces/recipe/recipe-response.interface";

const HomePage = () => {
  const [recipes, setRecipes] = useState<IRecipeResponse[]>([]);

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

  return (
    <div className="flex ">
      <div className="w-4/5">
        <Grettings />
        <div className="mt-10" />
        <h1 className="text-xl">Mais populares</h1>

        <div className="flex flex-wrap">
          {recipes.length > 0 ? (
            recipes.map((recipe: IRecipeResponse) => (
              <TrendingCard key={recipe.id} data={recipe} />
            ))
          ) : (
            <p>Nenhuma receita encontrada</p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-1/5 gap-y-6">
        <StatsCard
          title="Publico medio por rede"
          network1="Instagram"
          network2="X"
          value1={100}
          value2={300}
          gradient="from-pink-500 to-blue-400"
        />
        <StatsCard
          title="Sentimento do publico do X"
          network1="Positivo"
          network2="Negativo"
          value1={100}
          value2={300}
          gradient="from-blue-500 to-blue-400"
        />
        <StatsCard
          title="Sentimento do publico do instagram"
          network1="Positivo"
          network2="Negativo"
          value1={100}
          value2={300}
          gradient="from-pink-500 to-orange-500"
        />
      </div>
    </div>
  );
};

export default HomePage;
