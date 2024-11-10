import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    btn: {
      backgroundColor: theme.primary,
      minWidth: 200,
      height: 50,
      borderWidth: 1,
      borderColor: theme.primary,
      alignItems: "center",
      borderRadius: 8,
      justifyContent: "center",
      padding: 10,
    },
    btnText: {
      color: theme.background,
      fontSize: 20,
    },
  });
