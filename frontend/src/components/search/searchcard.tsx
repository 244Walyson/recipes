import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { IRecipeResponse } from "@/interfaces/recipe/recipe-response.interface";

type CardProps = {
  recipe: IRecipeResponse;
  onClick: () => void;
};

const Card = ({ recipe, onClick }: CardProps) => {
  const { name, imgUrl, preparationTime, macronutrients, servingCount, user } =
    recipe;

  return (
    <div
      className="flex flex-col border p-6 min-w-[600px] rounded-xl shadow-lg hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="relative w-full h-40">
        <Image
          className="rounded-lg object-cover"
          src={imgUrl ?? "/default-recipe.png"}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{name}</h1>
        </div>

        <div className="mt-2">
          <p className="text-gray-600 text-sm">
            Tempo de preparo: <strong>{preparationTime} minutos</strong>
          </p>
          <p className="text-gray-600 text-sm">
            Porções: <strong>{servingCount}</strong>
          </p>
          <p className="text-gray-600 text-sm">
            Macronutrientes:{" "}
            <strong>
              {macronutrients?.protein}g de proteína,{" "}
              {macronutrients?.carbohydrate}g de carboidrato,{" "}
              {macronutrients?.fat}g de gordura
            </strong>
          </p>
        </div>

        <div className="flex items-center mt-4">
          <Avatar>
            <AvatarImage src={user?.imgUrl} />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <p className="ml-3 text-lg font-medium">{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
