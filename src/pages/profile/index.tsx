import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RecipeCard from "@/src/components/recipe-card"; // Certifique-se de que o caminho está correto

const Profile = () => {
  const [isFocused, setIsFocused] = useState("grid");

  const handleFocusChange = (buttonName: string) => {
    setIsFocused(buttonName);
  };

  // Mock de dados para as receitas
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
      <View style={styles.headerWrapper}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.navigationWrapper}>
          <TouchableOpacity onPress={() => console.log("Voltar")}>
            <Ionicons name="arrow-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil</Text>
          <TouchableOpacity onPress={() => console.log("Like")}>
            <MaterialIcons name="logout" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.profileInfo}>
          <Image
            source={require("../../assets/food.png")}
            style={styles.imageAvatar}
          />
          <Text style={styles.textInfo}>Nome</Text>
          <Text style={styles.textInfoLight}>@Username</Text>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.btn}>
              <Text>Seguir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text>Edit</Text>
            </TouchableOpacity>
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
  },
  headerWrapper: {
    flexDirection: "row",
  },
  navigationWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
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
  btn: {
    backgroundColor: "#f6b100",
    padding: 5,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 20,
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
