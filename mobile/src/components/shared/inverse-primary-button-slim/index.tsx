import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

type InversePrimaryButtonSlimProps = {
  text: string;
  onPress: () => void;
};

const InversePrimaryButtonSlim = ({
  text,
  onPress,
}: InversePrimaryButtonSlimProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles(theme).btn} onPress={onPress}>
      <Text style={styles(theme).btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default InversePrimaryButtonSlim;
