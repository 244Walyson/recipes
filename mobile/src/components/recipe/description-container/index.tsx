import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import AuthorCard from "../author-card";
import AntDesign from "react-native-vector-icons/AntDesign";

const DescriptionContainer = () => {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).container}>
      <View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textTitle}>Hamburguer do chefe</Text>
          <View
            style={[
              styles(theme).textWrapper,
              { gap: 10, alignItems: "center" },
            ]}
          >
            <AntDesign name="heart" size={24} color={theme.tertiary} />
            <Text style={styles(theme).textLight}>1k</Text>
          </View>
        </View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textLight}>Sobremesa</Text>
          <Text style={styles(theme).textLight}>1h 20min</Text>
        </View>
      </View>
      <AuthorCard />
    </View>
  );
};

export default DescriptionContainer;
