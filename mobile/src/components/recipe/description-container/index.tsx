import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import AntDesign from "react-native-vector-icons/AntDesign";

interface DescriptionContainerProps {
  title: string;
  likes: number;
  mealType?: string;
  time?: string;
  liked?: boolean;
}

const DescriptionContainer: React.FC<DescriptionContainerProps> = ({
  title,
  likes,
  mealType,
  time,
  liked,
}) => {
  const { theme } = useTheme();
  const [favourite, setFavourite] = useState(liked);

  const handleFavourite = () => {
    console.log(favourite);
    setFavourite(!favourite);
  };

  console.log(favourite);

  return (
    <View style={styles(theme).container}>
      <View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textTitle}>{title}</Text>
          <View
            style={[
              styles(theme).textWrapper,
              { gap: 10, alignItems: "center" },
            ]}
          >
            <TouchableOpacity onPress={handleFavourite}>
              <AntDesign
                name="heart"
                size={24}
                color={!favourite ? theme.tertiary : theme.error}
              />
            </TouchableOpacity>
            <Text style={styles(theme).textLight}>{likes}</Text>
          </View>
        </View>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).textLight}>{mealType}</Text>
          <Text style={styles(theme).textLight}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default DescriptionContainer;
