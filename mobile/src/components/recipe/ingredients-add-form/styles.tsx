import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    inputWrapper: {
      width: "100%",
      flexDirection: "row",
      gap: 10,
      paddingVertical: 10,
      flex: 1,
      justifyContent: "space-between",
    },
    selectWrapper: {
      width: 130,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.opacitybg,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.quaternary,
      height: 45,
      padding: 10,
      marginBottom: 15,
    },
    input: {
      flex: 1,
    },
    addWrapper: {
      backgroundColor: theme.secondary,
      borderRadius: 8,
      width: 60,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
    },
  });
