import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: theme.foreground,
      fontSize: 16,
    },
  });
