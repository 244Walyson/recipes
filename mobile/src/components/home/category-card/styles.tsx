import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    trendingContainer: {
      width: 220,
      height: 200,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      backgroundColor: theme.accent,
      padding: 10,
      marginTop: 40,
      paddingBottom: 20,
    },
    textDescWrapper: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textWrapper: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    timeText: {
      fontSize: 18,
      marginLeft: 10,
      color: theme.background,
    },
    textTitle: {
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
      color: theme.background,
    },
    textAuthor: {
      color: theme.secondaryText,
      fontSize: 20,
    },
    image: {
      borderRadius: 50,
      width: 100,
      height: 100,
      marginTop: -40,
      backgroundColor: theme.background,
      borderWidth: 5,
      borderColor: theme.background,
    },
  });
