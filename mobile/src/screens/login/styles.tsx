import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: theme.background,
    },
    loginContainer: {
      width: "90%",
      height: "60%",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: 20,
      marginBottom: 50,
    },
    svg: {
      width: "100%",
      height: "100%",
      transform: [{ scaleX: 1.15 }],
      aspectRatio: 1.5,
    },
    svgTop: {
      position: "absolute",
      top: 0,
    },
    svgBottom: {
      position: "absolute",
      bottom: 0,
      transform: [{ scaleX: 1.3 }],
    },
    text: {
      fontSize: 34,
      fontWeight: "bold",
      textAlign: "center",
      color: theme.foreground,
    },
    textLogin: {
      marginBottom: 10,
    },
    btnLogin: {
      minWidth: 200,
      height: 50,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.background,
    },
    btnLoginContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    textButton: {
      color: theme.background,
      fontSize: 24,
    },
    textLight: {
      fontSize: 14,
      marginTop: 10,
      color: theme.background,
    },
    socialMediaLogin: {
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "100%",
      marginTop: 20,
    },
    socialMediaLoginBtn: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
      elevation: 3,
    },
  });
