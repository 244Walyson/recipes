import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    errorContainer: {
      position: "absolute",
      width: "100%",
      top: 0,
      flexDirection: "row",
      zIndex: 80,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      color: theme.success,
      fontSize: 20,
      marginLeft: 10,
    },
  });
