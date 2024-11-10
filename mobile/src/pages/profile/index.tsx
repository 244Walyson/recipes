import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InversePrimaryButtonSlim from "@/src/components/shared/inverse-primary-button-slim";
import { router } from "expo-router";
import HeaderSecondary from "@/src/components/shared/header-secondary";

const Profile = () => {
  const [isFocused, setIsFocused] = useState("grid");
  const [following, setFollowing] = useState(false);

  const logout = () => {
    router.push("/login");
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
    <View style={styles.container}>
      <View>
        <StatusBar translucent backgroundColor="transparent" />
        <HeaderSecondary
          ioniconLeftName="arrow-left"
          ioniconRightName="logout"
          title="Perfil"
          colorEmphasis="#000"
          onPressLeft={() => {}}
          onPressRight={logout}
        />
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.profileInfo}>
          <Image
            source={require("../../assets/food.png")}
            style={styles.imageAvatar}
          />
          <Text style={styles.textInfo}>Nome</Text>
          <Text style={styles.textInfoLight}>@Username</Text>
          <View style={styles.btnWrapper}>
            <InversePrimaryButtonSlim
              text={getBtnText()}
              onPress={handleBtnPress}
            />
          </View>
        </View>
        <View style={styles.profileNavigation}>
          <TouchableOpacity
            style={[
              styles.btnNav,
              isFocused === "grid" && styles.btnNavFocused,
            ]}
            onPress={() => handleFocusChange("grid")}
          >
            <MaterialCommunityIcons name="grid" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnNav,
              isFocused === "heart" && styles.btnNavFocused,
            ]}
            onPress={() => handleFocusChange("heart")}
          >
            <Ionicons name="heart-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={recipes}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.recipeCardContainer}>
            <Image source={item} style={styles.recipeImage} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.recipeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 70,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    gap: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  btnNav: {
    padding: 5,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  btnNavFocused: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  middleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 400,
  },
  imageAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileInfo: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInfo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textInfoLight: {
    fontSize: 18,
    color: "#ccc",
  },
  profileNavigation: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  recipeList: {
    marginTop: 15,
    padding: 10,
  },
  recipeCardContainer: {
    flex: 1,
    width: 130,
    height: 130,
    marginBottom: 5,
    marginRight: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default Profile;
