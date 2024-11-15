import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      marginBottom: 70,
    },
    btnWrapper: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      gap: 20,
      paddingHorizontal: 20,
      marginTop: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.foreground,
    },
    btnNav: {
      padding: 5,
      minWidth: 80,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      marginHorizontal: 10,
    },
    btnNavFocused: {
      borderBottomWidth: 1,
      borderBottomColor: theme.foreground,
    },
    middleContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      height: 280,
    },
    imageAvatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    profileInfo: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textInfo: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.foreground,
    },
    textInfoLight: {
      fontSize: 18,
      color: theme.tertiary,
    },
    profileNavigation: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      padding: 20,
      backgroundColor: theme.background,
    },
    recipeList: {
      marginTop: 15,
      padding: 10,
    },
    recipeCardContainer: {
      flex: 1,
      width: 130,
      height: 130,
      marginBottom: 5,
      marginRight: 5,
      borderRadius: 10,
      overflow: "hidden",
    },
    recipeImage: {
      width: "100%",
      height: 200,
      borderRadius: 10,
    },
  });
