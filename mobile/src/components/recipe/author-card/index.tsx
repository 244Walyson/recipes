import React from "react";
import Avatar from "../../shared/avatar";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import { View, Text } from "react-native";

const AuthorCard = () => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Avatar />
      <View style={{ flex: 1, gap: 10 }}>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).text}>Jhon Doe</Text>
          <Text style={styles(theme).textLight}>120 receitas</Text>
        </View>
        <Text style={styles(theme).textLight}>Chefe de cozinha no Glouton</Text>
      </View>
    </View>
  );
};

export default AuthorCard;
