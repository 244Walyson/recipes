import React from "react";
import { useTheme } from "@/src/context/theme-context";
import { View, ActivityIndicator } from "react-native";
import { styles } from "./styles";

const LoadingContainer = () => {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).loadingContainer}>
      <ActivityIndicator size="large" color={theme.foreground} />
    </View>
  );
};

export default LoadingContainer;
