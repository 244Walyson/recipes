import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    header: {
      padding: 20,
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
      fontFamily: "ABeeZee_400Regular",
    },
    iconWrapper: {
      flexDirection: "row",
      gap: 30,
    },
    cardsContainer: {
      paddingTop: 10,
      paddingBottom: 80,
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
