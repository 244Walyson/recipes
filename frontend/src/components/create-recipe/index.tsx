"use client";

import React from "react";

import RecipeForm from "./recipeForm";

const CreateRecipe = () => {
  return (
    <section>
      <h1 className="text-3xl">Nova receita</h1>
      <div className="w-full flex justify-center items-center">
        <div className="w-2/5">
          <RecipeForm />
        </div>
      </div>
    </section>
  );
};

export default CreateRecipe;
