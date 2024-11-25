import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  favouriteRecipe,
  unfavouriteRecipe,
} from "@/src/services/recipe.service";

interface DescriptionContainerProps {
  title: string;
  mealType?: string;
  time?: string;
  recipeId: string;
  favourite: boolean;
  favouriteCount: number;
}

const DescriptionContainer: React.FC<DescriptionContainerProps> = ({
  title,
  mealType,
  time,
  recipeId,
  favourite,
  favouriteCount,
}) => {
  const { theme } = useTheme();
  const [favourited, setFavourited] = useState(favourite);
  const [favourites, setFavourites] = useState(favouriteCount);

  useEffect(() => {
    console.log(favourite, favouriteCount);
    setFavourited(favourite);
    setFavourites(favouriteCount);
  }, [favourite, favouriteCount]);

  const handleFavourite = () => {
    const newFavourited = !favourited;
    const newFavourites = newFavourited ? favourites + 1 : favourites - 1;

    setFavourited(newFavourited);
    setFavourites(newFavourites);

    // Faz a requisição para favoritar ou desfavoritar
    if (newFavourited) {
      favouriteRecipe(recipeId).then(() => {
        // Sucesso em favoritar, nenhuma atualização adicional necessária
      });
    } else {
      unfavouriteRecipe(recipeId).then(() => {
        // Sucesso em desfavoritar, nenhuma atualização adicional necessária
      });
    }
  };

  const getPreparationTime = () => {
    if (Number(time) < 60) {
      return `${time} minutos`;
    }
    const hours = Math.floor(Number(time) / 60);
    const minutes = Number(time) % 60;
    return `${hours}h ${minutes}min`;
  };

  return (
    <View style={styles(theme).container}>
      <View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textTitle}>{title}</Text>
          <View
            style={[
              styles(theme).textWrapper,
              { gap: 10, alignItems: "center" },
            ]}
          >
            <TouchableOpacity onPress={handleFavourite}>
              <AntDesign
                name="heart"
                size={24}
                color={favourited ? theme.error : theme.tertiary}
              />
            </TouchableOpacity>
            <Text style={styles(theme).textLight}>{favourites}</Text>
          </View>
        </View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textLight}>{mealType}</Text>
          <Text style={styles(theme).textLight}>{getPreparationTime()}</Text>
        </View>
      </View>
    </View>
  );
};

export default DescriptionContainer;
