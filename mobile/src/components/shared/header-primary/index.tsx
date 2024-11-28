import React from "react";
import { View, Text, Image } from "react-native";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";

type CustomheaderProps = {
  smallText?: string;
  bigText?: string;
  coloredText?: string;
  imgUrl?: string;
};

const Header = ({
  smallText,
  bigText,
  coloredText,
  imgUrl,
}: CustomheaderProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).textContainer}>
        <View style={styles(theme).textWrapper}>
          <View style={styles(theme).headerWrapper}>
            <Text style={styles(theme).headerText}>{smallText}</Text>
            <Text style={[styles(theme).headerText, styles(theme).textColored]}>
              {" "}
              {coloredText}
            </Text>
          </View>
        </View>
        <Text style={styles(theme).recipetext}>{bigText}</Text>
      </View>
      {imgUrl && <Image source={{ uri: imgUrl }} style={styles(theme).image} />}
    </View>
  );
};

export default Header;
