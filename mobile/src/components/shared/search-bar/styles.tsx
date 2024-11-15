import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: theme.primary,
      borderWidth: 1,
      borderRadius: 50,
      paddingHorizontal: 10,
      backgroundColor: theme.background,
    },
    input: {
      width: "90%",
      height: 45,
      fontSize: 18,
      color: theme.foreground,
      backgroundColor: theme.background,
    },
    searchIcon: {
      color: theme.primary,
      marginRight: 10,
    },
  });
