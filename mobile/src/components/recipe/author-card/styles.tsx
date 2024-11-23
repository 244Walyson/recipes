import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      gap: 10,
      borderWidth: 0.1,
      borderColor: theme.quaternary,
      borderRadius: 12,
      padding: 10,
    },
    text: {
      fontWeight: "bold",
      fontSize: 20,
      color: theme.foreground,
    },
    textLight: {
      fontSize: 16,
      color: theme.tertiary,
    },
    textWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
  });
