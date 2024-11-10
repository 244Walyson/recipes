import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    btn: {
      backgroundColor: theme.background,
      height: 30,
      borderWidth: 1,
      alignItems: "center",
      borderColor: theme.primary,
      borderRadius: 8,
      justifyContent: "center",
      flex: 1,
    },
    btnText: {
      color: theme.primary,
      fontSize: 16,
    },
  });
