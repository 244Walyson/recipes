import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      flexDirection: "row",
      marginTop: statusBarHeight,
      width: "100%",
      alignItems: "flex-end",
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
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
    image: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
  });
