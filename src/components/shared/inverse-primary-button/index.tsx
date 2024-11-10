import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { styles } from "./styles";

type CustomButtomProps = {
  text: string;
  onPress: () => void;
};

const InversePrimaryButton = ({ text, onPress }: CustomButtomProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles(theme).btn} onPress={onPress}>
      <Text style={styles(theme).btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default InversePrimaryButton;
