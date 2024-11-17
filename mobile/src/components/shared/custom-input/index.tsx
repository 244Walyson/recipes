import { useTheme } from "@/src/context/theme-context";
import React from "react";
import { TextInput, Text, View } from "react-native";
import { styles } from "./styles";

type LoginInputProps = {
  label?: string;
  placeholder: string;
  keyboardType: "default" | "email-address" | "numeric" | "phone-pad";
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  value?: string;
  onFocus?: () => void;
  editable?: boolean;
};

const CustomInput = ({
  label,
  placeholder,
  keyboardType,
  onChangeText,
  isPassword = false,
  value,
  onFocus,
  editable = true,
}: LoginInputProps) => {
  const { theme } = useTheme();

  return (
    <View>
      {label && <Text style={styles(theme).textSpan}>{label}</Text>}
      <TextInput
        style={[styles(theme).input]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={isPassword}
        autoCapitalize="none"
        value={value}
        onFocus={onFocus}
        editable={editable}
        placeholderTextColor={theme.quaternary}
      />
    </View>
  );
};

export default CustomInput;
