import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    trendingContainer: {
      width: 160,
      height: 140,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      backgroundColor: theme.quaternary,
      padding: 10,
      marginTop: 40,
      gap: 5,
      paddingBottom: 20,
    },
    textBy: {
      fontSize: 12,
      color: theme.secondaryText,
    },
    textDescWrapper: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    timeText: {
      fontSize: 18,
      color: theme.tertiary,
    },
    textTitle: {
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bold",
      color: theme.foreground,
    },
    textAuthor: {
      color: theme.secondaryText,
      fontSize: 14,
    },
    image: {
      borderRadius: 40,
      width: 80,
      height: 80,
      marginTop: -20,
      backgroundColor: theme.background,
      borderWidth: 5,
      borderColor: theme.background,
    },
  });
