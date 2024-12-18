import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    textSpan: {
      fontSize: 16,
      marginVertical: 10,
      color: theme.quaternary,
      fontFamily: "ABeeZee_400Regular",
    },
    input: {
      width: "100%",
      height: 45,
      borderColor: theme.quaternary,
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      backgroundColor: theme.opacityBg,
      color: theme.foreground,
      fontFamily: "ABeeZee_400Regular",
    },
    invalid: {
      borderColor: theme.error,
    },
  });
