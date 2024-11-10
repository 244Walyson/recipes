import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    btn: {
      backgroundColor: theme.primary,
      height: 50,
      borderWidth: 1,
      alignItems: "center",
      borderColor: theme.primary,
      borderRadius: 8,
      justifyContent: "center",
      padding: 10,
      flex: 1,
    },
    btnText: {
      color: theme.background,
      fontSize: 20,
    },
  });
