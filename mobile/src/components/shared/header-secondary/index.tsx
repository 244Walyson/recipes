import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type HeaderIputProps = {
  title: string;
  ioniconLeftName: string;
  ioniconRightName: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
};

const HeaderSecondary = ({
  title,
  ioniconLeftName,
  ioniconRightName,
  onPressLeft,
  onPressRight,
}: HeaderIputProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPressLeft}>
        <Ionicons name={ioniconLeftName} size={30} color={"#fff"} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={onPressRight}>
        <Ionicons name={ioniconRightName} size={30} color={"#fff"} />
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
    color: "#fff",
  },
});

export default HeaderSecondary;
