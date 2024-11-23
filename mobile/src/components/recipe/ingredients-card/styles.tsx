import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      height: 50,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 0.2,
      borderColor: theme.tertiary,
      borderRadius: 10,
    },
    textTitle: {
      fontSize: 18,
      color: theme.foreground,
    },
    quantityText: {
      fontSize: 16,
      color: theme.tertiary,
    },
    textWrapper: {
      flexDirection: "row",
      gap: 10,
    },
  });
