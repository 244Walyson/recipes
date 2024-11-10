import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import MatierialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type HeaderIputProps = {
  title: string;
  ioniconLeftName: string;
  ioniconRightName: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  colorEmphasis?: string;
};

const HeaderSecondary = ({
  title,
  ioniconLeftName,
  ioniconRightName,
  onPressLeft,
  onPressRight,
  colorEmphasis,
}: HeaderIputProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPressLeft}>
        <MatierialComunityIcons
          name={ioniconLeftName}
          size={30}
          color={colorEmphasis}
        />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colorEmphasis }]}>
        {title}
      </Text>
      <TouchableOpacity onPress={onPressRight}>
        <MatierialComunityIcons
          name={ioniconRightName}
          size={30}
          color={colorEmphasis}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HeaderSecondary;
