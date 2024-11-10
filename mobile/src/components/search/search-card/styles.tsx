import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      flex: 1,
      width: "100%",
      height: 130,
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: theme.tertiary,
    },
    descriptionContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    textWrapper: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    textTitle: {
      fontSize: 24,
      fontWeight: "bold",
    },
    textType: {
      fontSize: 18,
      color: theme.tertiary,
    },
    textAuthor: {
      fontSize: 18,
      color: theme.tertiary,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 20,
      marginRight: 10,
    },
  });
