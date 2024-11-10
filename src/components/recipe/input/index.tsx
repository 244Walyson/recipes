import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { TextInput, View, Text } from "react-native";
import { styles } from "./styles";

type FormInputProps = {
  label?: string;
  placeholder: string;
  inputType: string;
  onchange: (text: string) => void;
};

const FormInput = ({
  label,
  placeholder,
  inputType,
  onchange,
}: FormInputProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      {label && <Text style={styles(theme).label}>{label}</Text>}
      <TextInput
        style={styles(theme).input}
        placeholder={placeholder}
        onChangeText={(text) => onchange(text)}
      />
    </View>
  );
};

export default FormInput;
