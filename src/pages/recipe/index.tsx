import AvatarCard from "@/src/components/avatar-card";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import IngredintsCard from "@/src/components/ingredients-card";
import RecipeInstructions from "@/src/components/recipe-instructions-container";

const Recipe = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../../assets/food.png")}
        style={styles.image}
      >
        <View style={styles.navigationWrapper}>
          <TouchableOpacity onPress={() => console.log("Voltar")}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Like")}>
            <Ionicons name="heart-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.recipeContainer}>
        <Text style={styles.textTitle}>Hamburguer do chefe</Text>
        <Text style={styles.textType}>Sobremesa</Text>

        <View style={styles.authorWrapper}>
          <AvatarCard />
        </View>

        <View style={styles.navigationWrapper}>
          <TouchableOpacity style={styles.btn} onPress={() => {}}>
            <Text style={styles.btnText}>Ingredintes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => {}}>
            <Text style={styles.btnText}>Modo de Preparo</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.instructionsContainer}>
          <RecipeInstructions />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  recipeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  navigationWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  btn: {
    backgroundColor: "#BF926B",
    minWidth: 200,
    height: 50,
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    padding: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
  },
  textTitle: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  textType: {
    fontSize: 24,
    color: "#ccc",
    textAlign: "center",
  },
  authorWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  instructionsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
});

export default Recipe;
