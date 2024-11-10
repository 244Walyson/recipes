import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

type CategoryCardProps = {
  name: string;
  author: string;
  time: string;
  imgUrl: string;
};

const CategoryCard = ({ name, author, time, imgUrl }: CategoryCardProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).trendingContainer}>
      <Image
        source={require("../../../assets/food.png")}
        style={styles(theme).image}
      />
      <View style={styles(theme).textDescWrapper}>
        <Text style={[styles(theme).textTitle]}>{name}</Text>
      </View>
      <View>
        <Text style={[styles(theme).textTitle, styles(theme).textAuthor]}>
          by
        </Text>

        <Text style={[styles(theme).textTitle, styles(theme).textAuthor]}>
          {author}
        </Text>
      </View>
      <View style={styles(theme).textWrapper}>
        <Text style={styles(theme).timeText}>{time}</Text>
        <Ionicons name="heart-outline" size={30} color={theme.background} />
      </View>
    </View>
  );
};

export default CategoryCard;
