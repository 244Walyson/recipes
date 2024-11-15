import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";

type CustomButtonProps = {
  text: string;
  onPress: () => void;
  isActive?: boolean;
};

const PrimaryButton = ({
  text,
  onPress,
  isActive = true,
}: CustomButtonProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles(theme, isActive).btn} onPress={onPress}>
      <Text style={styles(theme, isActive).btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
