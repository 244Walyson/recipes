import React from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";

type CustomButtonProps = {
  text: string;
  onPress: () => void;
  isActive?: boolean;
  loading?: boolean;
};

const PrimaryButton = ({
  text,
  onPress,
  isActive = true,
  loading = false,
}: CustomButtonProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={styles(theme, isActive).btn}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <View style={styles(theme, isActive).loadingContainer}>
          <ActivityIndicator size="large" color={theme.foreground} />
        </View>
      ) : (
        <Text style={styles(theme, isActive).btnText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
