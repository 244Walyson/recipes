import React from "react";
import Avatar from "../../shared/avatar";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface AuthorCardProps {
  name: string;
  recipeCount?: number;
  jobTitle?: string;
  avatarUrl?: string;
  userId: string;
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  name,
  recipeCount,
  jobTitle,
  avatarUrl,
  userId,
}) => {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push(`/profiles/${userId}`);
    console.log("author card pressed");
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles(theme).container}>
      <Avatar imgUrl={avatarUrl} />
      <View style={{ flex: 1, gap: 10 }}>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).text}>{name}</Text>
          <Text style={styles(theme).textLight}>{recipeCount} receitas</Text>
        </View>
        <Text style={styles(theme).textLight}>{jobTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AuthorCard;
