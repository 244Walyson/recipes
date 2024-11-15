import { StyleSheet } from "react-native";

export const styles = (theme: any, isActive: boolean) =>
  StyleSheet.create({
    btn: {
      backgroundColor: isActive ? theme.primary : theme.background,
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
      color: isActive ? theme.background : theme.primary,
      fontSize: 18,
    },
  });
