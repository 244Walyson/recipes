import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    btn: {
      backgroundColor: theme.background,
      height: 50,
      borderWidth: 1,
      borderColor: theme.primary,
      alignItems: "center",
      borderRadius: 8,
      justifyContent: "center",
      padding: 10,
      flex: 1,
    },
    btnText: {
      color: theme.primary,
      fontSize: 20,
    },
  });
