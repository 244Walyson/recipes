import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";

type PrimaryButtonSlimProps = {
  text: string;
  onPress: () => void;
  isActive?: boolean;
};

const PrimaryButtonSlim = ({
  text,
  onPress,
  isActive = true,
}: PrimaryButtonSlimProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles(theme, isActive).btn} onPress={onPress}>
      <Text style={styles(theme, isActive).btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButtonSlim;
