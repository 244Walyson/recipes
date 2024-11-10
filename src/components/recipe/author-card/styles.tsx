import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    authorWrapper: {
      flexDirection: "row",
      gap: 10,
      padding: 20,
    },
    text: {
      fontWeight: "bold",
      fontSize: 24,
    },
    textLight: {
      fontSize: 16,
      color: theme.primary,
    },
  });
