import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    btnWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      gap: 20,
      justifyContent: "space-around",
    },
    recipeContainer: {
      flex: 1,
      backgroundColor: theme.background,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: -30,
    },
    image: {
      width: "100%",
      height: 400,
      resizeMode: "cover",
    },
    textTitle: {
      fontSize: 34,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
    },
    textType: {
      fontSize: 24,
      color: theme.tertiary,
      textAlign: "center",
    },
    authorWrapper: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      paddingHorizontal: 20,
    },
    instructionsContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
      width: "100%",
      height: "100%",
    },
    leftAlign: {
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 30,
    },
    textWrapper: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
