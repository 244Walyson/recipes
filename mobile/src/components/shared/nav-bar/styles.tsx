import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    tabBarContainer: {
      flexDirection: "row",
      width: "100%",
      height: 70,
      position: "absolute",
      backgroundColor: theme.background,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
    tabButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      marginHorizontal: 10,
      padding: 5,
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
  });
