import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Heart } from "lucide-react";
import { IRecipeResponse } from "@/interfaces/recipe/recipe-response.interface";

type TrendingCardProps = {
  data: IRecipeResponse;
};

const TrendingCard = ({ data }: TrendingCardProps) => {
  const {
    name,
    imgUrl,
    preparationTime,
    difficultyLevel,
    viewCount,
    favoriteCount,
    user: { name: authorName, imgUrl: authorImgUrl },
  } = data;

  return (
    <div className="w-96 h-auto border border-border shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300">
      <Image
        className="rounded-lg object-cover"
        src={imgUrl ?? "/cookImage.png"}
        alt={name}
        width={100}
        height={100}
        layout="responsive"
      />

      <div className="pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-primary">{name}</h1>
          <Heart
            fill={favoriteCount > 0 ? "#FF0000" : "#D3D3D3"}
            className="w-6 h-6 cursor-pointer text-red-500"
          />
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
