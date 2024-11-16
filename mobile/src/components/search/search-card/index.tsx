import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";
import { IMealType } from "@/src/interfaces/meal-type/meal-type.interface";

type SearchCardProps = {
  title: string;
  mealType?: IMealType[];
  time?: string;
  author: string;
  imgUrl?: string;
};

const SearchCard = ({
  title,
  mealType,
  time,
  author,
  imgUrl,
}: SearchCardProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Image
        source={imgUrl ? { uri: imgUrl } : require("../../../assets/food.png")}
        style={styles(theme).image}
      />
      <View style={styles(theme).descriptionContainer}>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textTitle}>{title}</Text>
        </View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textType}>
            {mealType && mealType[0].name}
          </Text>
          <Text style={styles(theme).textType}>{time}</Text>
        </View>
        <Text style={styles(theme).textAuthor}>by {author}</Text>
      </View>
    </View>
  );
};

export default SearchCard;
