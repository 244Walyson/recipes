import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 20,
      paddingBottom: 70,
      gap: 20,
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
      marginVertical: 20,
      height: 220,
      gap: 10,
    },
    categoryContainerwrapper: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginVertical: 10,
    },
    trendingText: {
      fontSize: 24,
      fontFamily: "ABeeZee_400Regular",
      color: theme.foreground,
    },
    textColored: {
      color: theme.primary,
      fontFamily: "ABeeZee_400Regular",
      fontSize: 18,
    },
    scrollContainer: {
      flexDirection: "row",
      marginVertical: 10,
      gap: 10,
    },
    trendingContainer: {
      width: "100%",
    },
  });
