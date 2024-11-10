import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

type TouchableModalProps = {
  text: string;
  onPress: () => void;
};

const TouchableModal = ({ text, onPress }: TouchableModalProps) => {
  return (
    <TouchableOpacity style={styles.optionBtn}>
      <Text>Facil</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionBtn: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default TouchableModal;
