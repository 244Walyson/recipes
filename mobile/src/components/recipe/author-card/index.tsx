import React from "react";
import Avatar from "../../shared/avatar";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import { View, Text } from "react-native";

const AuthorCard = () => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).authorWrapper}>
      <Avatar />
      <View>
        <Text style={styles(theme).text}>Jhon Doe</Text>
        <Text style={styles(theme).textLight}>120 receitas</Text>
      </View>
    </View>
  );
};

export default AuthorCard;
