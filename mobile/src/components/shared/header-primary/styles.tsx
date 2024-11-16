import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      justifyContent: "center",
      marginTop: statusBarHeight,
      backgroundColor: theme.background,
    },
    headerWrapper: {
      flexDirection: "row",
    },
    textWrapper: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: theme.foreground,
    },
    recipetext: {
      fontSize: 36,
      fontWeight: "bold",
      color: theme.foreground,
    },
    textColored: {
      color: theme.primary,
    },
  });
