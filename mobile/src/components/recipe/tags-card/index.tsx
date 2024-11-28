import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

type TagsCardProps = {
  text: string;
};

const TagsCard = ({ text }: TagsCardProps) => {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).text}>{text}</Text>
    </View>
  );
};

export default TagsCard;
