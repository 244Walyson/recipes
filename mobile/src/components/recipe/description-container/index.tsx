import React, { useState } from "react";
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

  const handleFavourite = () => {
    console.log("favourite", favourite);
    if (favourited) {
      console.log("unfavourite");
      unfavouriteRecipe(recipeId).then(() => {
        console.log("unfavourite");
        setFavourited(false);
        setFavourites(favourites - 1);
      });
      return;
    }
    if (!favourited) {
      console.log("favourite");
      favouriteRecipe(recipeId).then(() => {
        console.log("favourite");
        setFavourited(true);
        setFavourites(favourites + 1);
      });
    }
  };

  console.log(favourite);

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
