import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

type MealTypeProps = {
  name: string;
  author: string;
  imgUrl?: string;
  onPress?: () => void;
};

const MealTypeCard = ({ name, author, imgUrl, onPress }: MealTypeProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles(theme).trendingContainer}>
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
        <Text style={styles(theme).timeText}></Text>
        <Ionicons name="heart-outline" size={20} color={theme.tertiary} />
      </View>
    </TouchableOpacity>
  );
};

export default MealTypeCard;
