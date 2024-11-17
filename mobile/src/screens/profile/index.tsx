import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  Animated,
  RefreshControl,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import HeaderSecondary from "@/src/components/shared/header-secondary";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import { IUserResponse } from "@/src/interfaces/user/user-response.interface";
import {
  getStoredUserID,
  getUser,
  removeStoredUserID,
} from "@/src/services/user.service";
import { IPaginatedResponse } from "@/src/interfaces/paginated-response.interface";
import { IRecipeProjection } from "@/src/interfaces/recipe/recipe-response-projection.interface";
import { getRecipesByUserId } from "@/src/services/recipe.service";
import { removeAllTokens } from "@/src/services/auth.service";
import PrimaryButton from "@/src/components/shared/primary-button";
import PrimaryButtonSlim from "@/src/components/shared/primary-button-slim";

const H_MAX_HEIGHT = 320;
const H_MIN_HEIGHT = 60;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const Profile = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState<IUserResponse>();
  const [isFocused, setIsFocused] = useState("grid");
  const [following, setFollowing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [recipes, setRecipes] =
    useState<IPaginatedResponse<IRecipeProjection>>();

  const scrollY = useRef(new Animated.Value(0)).current;

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [0, -H_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  useEffect(() => {
    getStoredUserID().then((userId) => {
      if (!userId) {
        router.push("/register");
        return;
      }
      getUser(userId).then((data) => {
        setUser(data);
      });
      getRecipesByUserId(userId).then((data) => {
        console.log(data);
        setRecipes(data);
      });
      setRefreshing(false);
    });
  }, [refreshing]);

  const logout = () => {
    removeAllTokens();
    removeStoredUserID();
    router.replace("/register");
  };

  const isProfileOwner = () => {
    return true;
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
      return;
    }
    console.log("Edit profile");
  };

  const handleFocusChange = (buttonName: string) => {
    setIsFocused(buttonName);
  };

  const handleRecipePress = (id: string) => {
    router.push(`/recipes/${id}`);
  };

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
              source={{ uri: user?.imgUrl }}
              style={styles(theme).imageAvatar}
            />
            <Text style={styles(theme).textInfo}>{user?.name}</Text>
            <Text style={styles(theme).textInfoLight}>{user?.username}</Text>
            <View style={styles(theme).btnWrapper}>
              <PrimaryButtonSlim
                text={getBtnText()}
                onPress={handleBtnPress}
                isActive={false}
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
            colors={[theme.foreground]}
            tintColor="transparent"
            progressBackgroundColor="transparent"
          />
        }
        scrollEventThrottle={16}
        data={recipes?.data}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles(theme).recipeCardContainer}
            onPress={() => handleRecipePress(item.id)}
          >
            <Image
              source={{ uri: item.imgUrl }}
              style={styles(theme).recipeImage}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[
          styles(theme).recipeList,
          { paddingTop: H_MAX_HEIGHT + 100 },
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
