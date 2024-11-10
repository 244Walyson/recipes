import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    btn: {
      backgroundColor: theme.primary,
      height: 30,
      borderWidth: 1,
      alignItems: "center",
      borderColor: theme.background,
      borderRadius: 8,
      justifyContent: "center",
      flex: 1,
    },
    btnText: {
      color: theme.background,
      fontSize: 16,
    },
  });
