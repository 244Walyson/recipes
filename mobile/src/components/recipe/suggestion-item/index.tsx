import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type SuggestionItemProps = {
  data: { id: string; text: string };
  onPress: (data: { id: string; text: string }) => void;
};

const SuggestionItem = ({ data, onPress }: SuggestionItemProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={styles(theme).container}
      onPress={() => onPress(data)}
    >
      <Text style={styles(theme).text}>{data.text}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      width: "100%",
      height: 35,
      marginVertical: 3,
      borderColor: theme.tertiary,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 5,
      alignSelf: "flex-start",
    },
    text: {
      fontSize: 18,
      color: theme.tertiary,
      textAlign: "left",
    },
  });

export default SuggestionItem;
