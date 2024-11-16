import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 10,
    },
    filterWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      backgroundColor: theme.background,
    },
    textWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    filtersContainer: {
      width: "100%",
      flexDirection: "row",
      gap: 20,
    },
    filtersText: {
      fontSize: 20,
      color: theme.tertiary,
    },
    iconWrapper: {
      flexDirection: "row",
      gap: 30,
    },
    cardsContainer: {
      paddingTop: 10,
      paddingBottom: 80,
    },
    categoryText: {
      fontSize: 20,
      color: theme.tertiary,
    },
    suggestion: {
      padding: 10,
      fontSize: 16,
      backgroundColor: theme.suggestionBg,
      color: theme.foreground,
      borderRadius: 8,
      borderBottomColor: "#ddd",
    },
  });
