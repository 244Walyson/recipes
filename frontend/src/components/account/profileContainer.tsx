"use client";

import React, { useState, useEffect } from "react";
import { getUser } from "@/services/user.service"; // Função para buscar o usuário
import RecipeCardProfile from "./recipeCard";
import { getRecipesByUserId } from "@/services/recipe.service";
import Image from "next/image";

const ProfileContainer = () => {
  const [user, setUser] = useState<any>(null); // Armazenando dados do usuário
  const [recipes, setRecipes] = useState<any[]>([]); // Armazenando as receitas do usuário
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  // Função para buscar dados do usuário
  const fetchUserData = async () => {
    try {
      const userID = await localStorage.getItem("userID");
      if (userID) {
        const userData = await getUser(userID);
        setUser(userData);
        fetchUserRecipes(userData.id); // Buscar as receitas do usuário após obter os dados do usuário
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

  const fetchUserRecipes = async (userId: string) => {
    try {
      const userRecipes = await getRecipesByUserId(userId);
      setRecipes(userRecipes);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      setError("Error fetching user recipes");
    }
  };

  useEffect(() => {
    fetchUserData(); // Carrega os dados do usuário ao montar o componente
  }, []);

  return (
    <div>
      <div className="flex flex-col p-20 w-full items-center justify-center border-b">
        <Image
          className="rounded-full"
          imgUrl={user?.imgUrl ?? "/default-avatar.png"}
          width={200}
          height={200}
        />

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl">{user?.name}</h1>
          <h2>{user?.username}</h2>
          <p>{user?.email}</p>
          <p className="text-gray-500">
            Joined on: {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-4 mt-4 flex-wrap items-center justify-center">
          {recipes.length > 0 ? (
            recipes.map((recipe: any, index: number) => (
              <RecipeCardProfile key={index} recipe={recipe} />
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
