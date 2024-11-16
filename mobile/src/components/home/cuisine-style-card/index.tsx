import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

type cuisineStyleProps = {
  name: string;
  author: string;
  time?: string;
  imgUrl?: string;
  onLikePress?: () => void;
  onPress?: () => void;
};

const CuisineStyleCard = ({
  name,
  author,
  time,
  imgUrl,
}: cuisineStyleProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).trendingContainer}>
      <Image source={{ uri: imgUrl }} style={styles(theme).image} />
      <View style={styles(theme).textDescWrapper}>
        <Text style={[styles(theme).textTitle]}>{name}</Text>
      </View>
      <View>
        <View style={styles(theme).textWrapper}>
          <Text style={[styles(theme).textBy]}>by</Text>

          <Text style={[styles(theme).textTitle, styles(theme).textAuthor]}>
            {author}
          </Text>
        </View>
      </View>
      <View style={styles(theme).textWrapper}>
        <Text style={styles(theme).timeText}>{time}</Text>
        <Ionicons name="heart-outline" size={20} color={theme.tertiary} />
      </View>
    </View>
  );
};

export default CuisineStyleCard;
