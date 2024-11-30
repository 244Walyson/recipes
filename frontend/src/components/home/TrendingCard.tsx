import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { IRecipeResponse } from "@/interfaces/recipe/recipe-response.interface";

type TrendingCardProps = {
  data: IRecipeResponse;
  onClick: (recipeId: string) => void;
};

const TrendingCard = ({ data, onClick }: TrendingCardProps) => {
  const {
    id,
    name,
    imgUrl,
    preparationTime,
    difficultyLevel,
    viewCount,
    favoriteCount,
    user: { name: authorName, imgUrl: authorImgUrl },
  } = data;

  return (
    <div
      onClick={() => onClick(id)}
      className="w-96 h-auto border border-border shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <Image
        className="rounded-lg object-cover max-h-60"
        src={imgUrl ?? "/cookImage.png"}
        alt={name}
        width={100}
        height={100}
        layout="responsive"
      />

      <div className="pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-primary">{name}</h1>
        </div>

        <div className="w-full flex gap-3 pt-4 items-center">
          <Avatar>
            <AvatarImage src={authorImgUrl ?? "/default-avatar.png"} />
            <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl text-gray-700">{authorName}</h2>
        </div>
      </div>

      <div className="flex justify-between pt-6 text-sm text-primary">
        {difficultyLevel && (
          <div className="flex items-center">
            <span className="font-semibold mr-2">
              Nivel de dificuldade: {difficultyLevel}
            </span>
          </div>
        )}

        {!!preparationTime && (
          <div className="flex items-center">
            <span className="font-semibold">Time: </span>
            <span>{preparationTime} min</span>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4 text-sm text-primary">
        <div className="flex items-center">
          <span className="font-semibold">Views: {viewCount}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold">Favorites: {favoriteCount}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
