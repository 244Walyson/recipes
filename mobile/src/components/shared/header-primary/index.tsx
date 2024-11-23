import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";

type CustomheaderProps = {
  onChange?: (text: string) => void;
  onFocus?: () => void;
};

const Header = ({ onChange, onFocus }: CustomheaderProps) => {
  const { theme } = useTheme();

  return (
    <View>
      <View style={styles(theme).container}>
        <View style={styles(theme).textWrapper}>
          <View style={styles(theme).headerWrapper}>
            <Text style={styles(theme).headerText}>Encontre</Text>
            <Text style={[styles(theme).headerText, styles(theme).textColored]}>
              {" "}
              as melhores
            </Text>
          </View>
        </View>
        <Text style={styles(theme).recipetext}>receitas</Text>
      </View>
    </View>
  );
};

export default Header;
