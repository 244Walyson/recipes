import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      marginTop: statusBarHeight,
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
      fontFamily: "ABeeZee_400Regular",
      color: theme.foreground,
    },
    recipetext: {
      fontSize: 36,
      fontFamily: "ABeeZee_400Regular",
      color: theme.foreground,
    },
    textColored: {
      color: theme.primary,
    },
  });
