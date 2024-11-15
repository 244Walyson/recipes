import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.bacckground,
      width: "100%",
      height: "100%",
    },
    stepContainer: {
      marginBottom: 20,
      paddingBottom: 10,
    },
    stepTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      color: theme.foreground,
    },
    bulletPoint: {
      fontSize: 16,
      color: theme.quaternary,
      paddingLeft: 10,
    },
  });
