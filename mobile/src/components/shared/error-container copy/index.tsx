import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { View, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { styles } from "./styles";

type ErrorContainerProps = {
  message?: string;
};

const SuccessContainer = ({ message }: ErrorContainerProps) => {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).errorContainer}>
      <Feather name="check-square" size={32} color={theme.success} />
      <Text style={styles(theme).errorText}>{message}</Text>
    </View>
  );
};

export default SuccessContainer;
