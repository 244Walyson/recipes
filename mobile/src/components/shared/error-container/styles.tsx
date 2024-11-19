import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    errorContainer: {
      flexDirection: "row",
      zIndex: 80,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      color: theme.error,
      fontSize: 20,
      marginLeft: 10,
    },
  });
