import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    trendingContainer: {
      width: 180,
      height: 140,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      backgroundColor: theme.background,
    },
    textWrapper: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    timeText: {
      fontSize: 18,
      marginLeft: 10,
      color: theme.tertiary,
    },
    textTitle: {
      fontSize: 16,
      marginHorizontal: 10,
      marginVertical: 5,
      color: theme.foreground,
    },
    textDescWrapper: {
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    image: {
      borderRadius: 20,
      width: "100%",
      height: "100%",
      marginBottom: 10,
    },
  });
