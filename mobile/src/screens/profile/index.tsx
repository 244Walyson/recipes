import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  Animated,
  RefreshControl,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import HeaderSecondary from "@/src/components/shared/header-secondary";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import { IUserResponse } from "@/src/interfaces/user/user-response.interface";
import {
  getStoredUserID,
  getUser,
  removeStoredUserID,
  updateUser,
} from "@/src/services/user.service";
import { IPaginatedResponse } from "@/src/interfaces/paginated-response.interface";
import { IRecipeProjection } from "@/src/interfaces/recipe/recipe-response-projection.interface";
import {
  getRecipesByUserId,
  getRecipesFavouritedByUserId,
} from "@/src/services/recipe.service";
import PrimaryButtonSlim from "@/src/components/shared/primary-button-slim";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "@/src/services/image-upload.service";
import { removeTokens } from "@/src/services/token.service";
import { IUserRequest } from "@/src/interfaces/user/user-request.interface";

const H_MAX_HEIGHT = 320;
const H_MIN_HEIGHT = 60;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const Profile = () => {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<IUserResponse>();
  const [isFocused, setIsFocused] = useState("grid");
  const [following, setFollowing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [profileId, setProfileId] = useState<string>(id);
  const [recipes, setRecipes] =
    useState<IPaginatedResponse<IRecipeProjection>>();

  const scrollY = useRef(new Animated.Value(0)).current;

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [0, -H_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (!profileId) {
      getStoredUserID().then((userId) => {
        if (userId) {
          setProfileId(userId);
          return;
        }
        router.replace("/register");
      });
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (!profileId) return;
    getUser(profileId).then((data) => {
      setUser(data);
    });
    isFocused === "grid" ? handlegridPress() : handleFavouritePress();
    setRefreshing(false);
  }, [profileId, refreshing]);

  const logout = () => {
    removeTokens();
    removeStoredUserID();
    router.replace("/register");
  };

  const isProfileOwner = async () => {
    const userId = await getStoredUserID();
    return userId === profileId;
  };
  const getBtnText = () => {
    isProfileOwner().then((data) => {
      if (data) {
        return "Editar";
      }
    });
    return following ? "Seguindo" : "Seguir";
  };

  const handleBtnPress = async () => {
    if (!(await isProfileOwner())) {
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

  const handleFavouritePress = () => {
    getRecipesFavouritedByUserId(profileId).then((data) => {
      setRecipes(data);
      handleFocusChange("heart");
    });
  };

  const handlegridPress = () => {
    getRecipesByUserId(profileId).then((data) => {
      setRecipes(data);
      handleFocusChange("grid");
    });
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.3,
    });

    if (!result.canceled) {
      setRefreshing(true);
      const fileUri = result.assets[0].uri;
      uploadImage(fileUri)
        .then((imgUrl) => {
          if (imgUrl && user) {
            updateUserImg(user, imgUrl);
          }
          setRefreshing(true);
        })
        .catch((error) => {
          console.log("Error uploading image", error);
        });
    }
  };

  const updateUserImg = (data: IUserResponse, imgUrl: string) => {
    const userRequest: IUserRequest = {
      name: data.name,
      username: data.username,
      imgUrl: imgUrl,
      email: data.email,
      password: "",
    };

    updateUser(profileId, userRequest).then((data) => {
      console.log(data);
      setUser(data);
    });
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
            <TouchableOpacity onPress={openGallery}>
              <Image
                source={{ uri: user?.imgUrl }}
                style={styles(theme).imageAvatar}
              />
            </TouchableOpacity>
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
              onPress={() => handlegridPress()}
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
              onPress={() => handleFavouritePress()}
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
