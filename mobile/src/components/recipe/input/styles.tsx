import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      width: "100%",
      height: "100%",
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 8,
    },
    input: {
      flex: 1,
      backgroundColor: theme.inputBackground,
      padding: 10,
      borderRadius: 8,
      marginBottom: 15,
      fontSize: 16,
    },
  });
