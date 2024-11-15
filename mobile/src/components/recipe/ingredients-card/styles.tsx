import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      height: 50,
      borderRadius: 20,
      padding: 10,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
    },
    textTitle: {
      fontSize: 20,
      color: theme.foreground,
    },
    quantityText: {
      fontSize: 20,
      color: theme.tertiary,
    },
    textWrapper: {
      flexDirection: "row",
      gap: 10,
    },
  });
