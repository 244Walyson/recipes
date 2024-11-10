import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

type PrimaryButtonSlimProps = {
  text: string;
  onPress: () => void;
};

const PrimaryButtonSlim = ({ text, onPress }: PrimaryButtonSlimProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles(theme).btn}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButtonSlim;
