import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    trendingContainer: {
      width: 180,
      height: 210,
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
      fontFamily: "ABeeZee_400Regular",
    },
    textTitle: {
      fontSize: 18,
      marginHorizontal: 10,
      marginVertical: 5,
      color: theme.foreground,
      fontFamily: "ABeeZee_400Regular",
      width: "60%",
    },
    textDescWrapper: {
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    image: {
      borderRadius: 20,
      overflow: "hidden",
      width: "100%",
      height: 130,
      marginBottom: 10,
    },
  });
