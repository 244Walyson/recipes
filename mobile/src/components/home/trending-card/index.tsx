import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";

type TrendinCardProps = {
  title: string;
  imgUrl: any;
  views: number;
  difficultyLevel?: string;
  onLikePress: () => void;
  onPress: () => void;
};

const TrendinCard: React.FC<TrendinCardProps> = ({
  title,
  imgUrl,
  views,
  onLikePress,
  onPress,
  difficultyLevel,
}) => {
  const { theme } = useTheme();
  const [favourite, setFavourite] = React.useState(false);

  const handleLikePress = () => {
    onLikePress();
    setFavourite(!favourite);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles(theme).trendingContainer}>
      <Image source={{ uri: imgUrl }} style={styles(theme).image} />
      <View style={[styles(theme).textDescWrapper, { gap: 5 }]}>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textTitle}>{title}</Text>
          <Ionicons
            name={favourite ? "heart" : "heart-outline"}
            size={30}
            color={favourite ? theme.error : theme.tertiary}
            onPress={handleLikePress}
          />
        </View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).timeText}>{difficultyLevel}</Text>
          <Text style={styles(theme).timeText}>{views} views</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TrendinCard;
