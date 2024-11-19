import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    label: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 8,
    },
    inputWrapper: {
      width: "100%",
      flexDirection: "row",
      gap: 10,
      paddingVertical: 10,
      flex: 1,
      justifyContent: "space-between",
    },
    input: {
      flex: 1,
    },

    textStrong: {
      fontSize: 18,
      color: theme.tertiary,
      fontWeight: "bold",
      paddingHorizontal: 10,
    },
    textLight: {
      fontSize: 16,
      color: theme.tertiary,
      paddingHorizontal: 15,
    },
    addWrapper: {
      backgroundColor: theme.secondary,
      borderRadius: 8,
      width: 60,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
    },
    directionsContainer: {
      marginTop: 20,
      gap: 10,
    },
  });
