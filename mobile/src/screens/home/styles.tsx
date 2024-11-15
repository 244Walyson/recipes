import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 10,
      paddingBottom: 70,
    },
    textTrendWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 10,
    },
    trendingContainerWrapper: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginVertical: 10,
      height: 220,
    },
    categoryContainerwrapper: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginVertical: 10,
    },
    trendingText: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.foreground,
    },
    textColored: {
      color: theme.primary,
      fontSize: 18,
    },
    scrollContainer: {
      flexDirection: "row",
    },
    categoryText: {
      fontSize: 20,
      marginRight: 20,
      color: theme.secondaryText,
    },
    trendingContainer: {
      width: "100%",
      marginVertical: 10,
    },
  });
