import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    inputWrapper: {
      width: "100%",
      flexDirection: "row",
      gap: 10,
      paddingVertical: 10,
      flex: 1,
      justifyContent: "space-between",
    },
    input: {
      flex: 1,
    },
    suggestion: {
      color: theme.tertiary,
      fontSize: 16,
      padding: 10,
    },
    addWrapper: {
      backgroundColor: theme.secondary,
      borderRadius: 8,
      width: 60,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
    },
  });
