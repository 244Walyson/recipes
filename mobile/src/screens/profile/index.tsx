import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InversePrimaryButtonSlim from "@/src/components/shared/inverse-primary-button-slim";
import { router } from "expo-router";
import HeaderSecondary from "@/src/components/shared/header-secondary";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

const H_MAX_HEIGHT = 320;
const H_MIN_HEIGHT = 60;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const Profile = () => {
  const [isFocused, setIsFocused] = useState("grid");
  const [following, setFollowing] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [0, -H_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const { theme } = useTheme();

  const logout = () => {
    router.push("/register");
  };

  const isProfileOwner = () => {
    return false;
  };

  const getBtnText = () => {
    if (isProfileOwner()) {
      return "Editar";
    }
    return following ? "Seguindo" : "Seguir";
  };

  const handleBtnPress = () => {
    if (!isProfileOwner()) {
      setFollowing((prevState) => !prevState);
    } else {
      console.log("Editar perfil");
    }
  };

  const handleFocusChange = (buttonName: string) => {
    setIsFocused(buttonName);
  };

  const recipes = [
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
    require("../../assets/pancake.png"),
  ];

  return (
    <View style={styles(theme).container}>
      <StatusBar translucent={false} backgroundColor={theme.background} />
      <Animated.View
        style={[
          {
            transform: [{ translateY: imageTranslateY }],
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: H_MAX_HEIGHT,
            zIndex: 1,
          },
        ]}
      >
        <View>
          <StatusBar translucent backgroundColor="transparent" />
          <HeaderSecondary
            ioniconLeftName="arrow-left"
            ioniconRightName="logout"
            title="Perfil"
            colorEmphasis={theme.foreground}
            onPressLeft={() => {}}
            onPressRight={logout}
          />
        </View>
        <View style={styles(theme).middleContainer}>
          <View style={styles(theme).profileInfo}>
            <Image
              source={require("../../assets/food.png")}
              style={styles(theme).imageAvatar}
            />
            <Text style={styles(theme).textInfo}>Nome</Text>
            <Text style={styles(theme).textInfoLight}>@Username</Text>
            <View style={styles(theme).btnWrapper}>
              <InversePrimaryButtonSlim
                text={getBtnText()}
                onPress={handleBtnPress}
              />
            </View>
          </View>
          <View style={styles(theme).profileNavigation}>
            <TouchableOpacity
              style={[
                styles(theme).btnNav,
                isFocused === "grid" && styles(theme).btnNavFocused,
              ]}
              onPress={() => handleFocusChange("grid")}
            >
              <MaterialCommunityIcons
                name="grid"
                size={30}
                color={theme.foreground}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles(theme).btnNav,
                isFocused === "heart" && styles(theme).btnNavFocused,
              ]}
              onPress={() => handleFocusChange("heart")}
            >
              <Ionicons
                name="heart-outline"
                size={30}
                color={theme.foreground}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <FlatList
        scrollEventThrottle={16}
        data={recipes}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles(theme).recipeCardContainer}>
            <Image source={item} style={styles(theme).recipeImage} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[
          styles(theme).recipeList,
          { paddingTop: H_MAX_HEIGHT + 30, paddingBottom: 80 },
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
};

export default Profile;
