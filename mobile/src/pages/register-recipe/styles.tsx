import { StyleSheet } from "react-native";

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    formContainer: {
      padding: 20,
      paddingBottom: 80,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 8,
    },
    input: {
      flex: 1,
      backgroundColor: theme.inputBackground,
      padding: 10,
      borderRadius: 8,
      marginBottom: 15,
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: theme.buttonBackground,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
    },
    saveButtonText: {
      color: theme.buttonText,
      fontSize: 18,
      fontWeight: "bold",
    },
    image: {
      width: "100%",
      height: 400,
      resizeMode: "cover",
    },
    imagePlaceholder: {
      backgroundColor: theme.imagePlaceholderBackground,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.foreground,
      opacity: 0.7,
    },
    inputWrapper: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
      height: 60,
    },
    selectWrapper: {
      width: 130,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.inputBackground,
      borderRadius: 8,
      height: 45,
      padding: 10,
      marginBottom: 15,
    },
    textStrong: {
      fontSize: 18,
      color: theme.text,
      paddingHorizontal: 10,
    },
    textLight: {
      fontSize: 16,
      color: theme.text,
      paddingHorizontal: 15,
    },
    addWrapper: {
      backgroundColor: theme.inputBackground,
      borderRadius: 8,
      width: 60,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
    },
    directionsContainer: {
      marginTop: 20,
      gap: 10,
    },
  });
