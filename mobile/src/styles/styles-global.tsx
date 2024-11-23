import { StyleSheet } from "react-native";

export const globalFontStyles = (theme: any) =>
  StyleSheet.create({
    TitleText: {
      fontSize: 30,
      fontWeight: "bold",
      fontFamily: "Pacifico_400Regular",
      color: theme.foreground,
    },
    subHeaderText: {
      fontSize: 24,
      fontWeight: "normal",
      fontFamily: "Lora_400Regular",
      color: theme.foreground,
    },
    regularText: {
      fontSize: 16,
      fontFamily: "Lora_400Regular",
      color: theme.foreground,
    },
  });
