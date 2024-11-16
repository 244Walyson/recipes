import React from "react";
import Avatar from "../../shared/avatar";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import { View, Text } from "react-native";

interface AuthorCardProps {
  name: string;
  recipeCount?: number;
  jobTitle?: string;
  avatarUrl?: string;
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  name,
  recipeCount,
  jobTitle,
  avatarUrl,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Avatar imgUrl={avatarUrl} />
      <View style={{ flex: 1, gap: 10 }}>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).text}>{name}</Text>
          <Text style={styles(theme).textLight}>{recipeCount} receitas</Text>
        </View>
        <Text style={styles(theme).textLight}>{jobTitle}</Text>
      </View>
    </View>
  );
};

export default AuthorCard;
