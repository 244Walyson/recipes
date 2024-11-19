import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    loadingContainer: {
      position: "absolute",
      top: 100,
      left: "50%",
      right: "50%",
      zIndex: 2,
    },
  });
