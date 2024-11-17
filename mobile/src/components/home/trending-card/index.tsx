import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";

type TrendinCardProps = {
  title: string;
  imgUrl: any;
  time?: string;
  onLikePress: () => void;
  onPress: () => void;
};

const TrendinCard: React.FC<TrendinCardProps> = ({
  title,
  imgUrl,
  time,
  onLikePress,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles(theme).trendingContainer}>
      <Image source={{ uri: imgUrl }} style={styles(theme).image} />
      <View style={styles(theme).textWrapper}>
        <Text style={styles(theme).timeText}>{time}</Text>
        <Ionicons
          name="heart-outline"
          size={30}
          color="#ccc"
          onPress={onLikePress}
        />
      </View>
      <View style={styles(theme).textDescWrapper}>
        <Text style={styles(theme).textTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TrendinCard;
