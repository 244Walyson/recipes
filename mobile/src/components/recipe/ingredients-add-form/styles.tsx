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
      gap: 10,
      paddingVertical: 10,
      flex: 1,
      justifyContent: "space-between", // Garante que os itens ocupem o espaço corretamente
    },
    selectWrapper: {
      width: 130,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.opacitybg,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.quaternary,
      height: 45,
      padding: 10,
      marginBottom: 15,
    },
    input: {
      flex: 1,
    },

    textStrong: {
      fontSize: 18,
      color: theme.tertiary,
      fontWeight: "bold",
      paddingHorizontal: 10,
    },
    textLight: {
      fontSize: 16,
      color: theme.tertiary,
      paddingHorizontal: 15,
    },
    addWrapper: {
      backgroundColor: theme.secondary,
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
    suggestion: {
      padding: 10,
      fontSize: 16,
      backgroundColor: theme.suggestionBg,
      color: theme.foreground,
      borderRadius: 8,
      borderBottomColor: "#ddd",
    },
  });
