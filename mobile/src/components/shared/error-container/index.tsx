import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { View, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { styles } from "./styles";

type ErrorContainerProps = {
  error: string;
};

const ErrorContainer = ({ error }: ErrorContainerProps) => {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).errorContainer}>
      <Feather name="alert-triangle" size={32} color={theme.error} />
      <Text style={styles(theme).errorText}>{error}</Text>
    </View>
  );
};

export default ErrorContainer;
