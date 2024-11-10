import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
    },
    filterWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    textWrapper: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    filtersContainer: {
      width: "100%",
      height: 70,
      flexDirection: "row",
      gap: 20,
    },
    filtersText: {
      fontSize: 24,
      fontWeight: "bold",
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
  });
