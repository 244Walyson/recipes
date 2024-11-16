import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import AuthorCard from "../author-card";
import AntDesign from "react-native-vector-icons/AntDesign";

interface DescriptionContainerProps {
  title: string;
  likes: number;
  mealType?: string;
  time?: string;
}

const DescriptionContainer: React.FC<DescriptionContainerProps> = ({
  title,
  likes,
  mealType,
  time,
}) => {
  const { theme } = useTheme();

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
            <AntDesign name="heart" size={24} color={theme.tertiary} />
            <Text style={styles(theme).textLight}>{likes}</Text>
          </View>
        </View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textLight}>{mealType}</Text>
          <Text style={styles(theme).textLight}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default DescriptionContainer;
