import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      gap: 10,
      paddingHorizontal: 10,
    },
    textTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.foreground,
    },
    textWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 2,
    },
    textLight: {
      color: theme.tertiary,
      fontSize: 20,
    },
  });
