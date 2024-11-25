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
      backgroundColor: theme.background,
      padding: 10,
      marginTop: 10,
      gap: 5,
      paddingBottom: 20,
      borderWidth: 0.1,
      borderColor: theme.tertiary,
    },
    textBy: {
      fontSize: 12,
      color: theme.secondaryText,
      fontFamily: "ABeeZee_400Regular",
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
      fontFamily: "ABeeZee_400Regular",
    },
    textTitle: {
      fontSize: 18,
      textAlign: "center",
      fontFamily: "ABeeZee_400Regular",
      color: theme.foreground,
    },
    textAuthor: {
      color: theme.secondaryText,
      fontSize: 14,
      fontFamily: "ABeeZee_400Regular",
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
