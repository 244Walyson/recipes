import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";
import { IMealType } from "@/src/interfaces/meal-type/meal-type.interface";

type SearchCardProps = {
  title: string;
  mealType?: IMealType[];
  time?: string;
  author: string;
  imgUrl?: string;
  onPress: () => void;
};

const SearchCard = ({
  title,
  mealType,
  time,
  author,
  imgUrl,
  onPress,
}: SearchCardProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles(theme).container} onPress={onPress}>
      <Image source={{ uri: imgUrl }} style={styles(theme).image} />
      <View style={styles(theme).descriptionContainer}>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textTitle}>{title}</Text>
        </View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textType}>{mealType?.[0]?.name}</Text>
          <Text style={styles(theme).textType}>{time}</Text>
        </View>
        <Text style={styles(theme).textAuthor}>by {author}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;
