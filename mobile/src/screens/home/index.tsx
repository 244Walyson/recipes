import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Header from "@/src/components/shared/header-primary";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import TrendinCard from "@/src/components/home/trending-card";
import { getCuisineStyles } from "@/src/services/cuisine-style.service";
import { ICuisineStyle } from "@/src/interfaces/cuisine-style/cousine-styles.interface";
import { IRecipeResponse } from "@/src/interfaces/recipe/recipe-response.interface";
import {
  getRecipesByCuisineStyle,
  getTrendingecipes,
} from "@/src/services/recipe.service";
import { IPaginatedResponse } from "@/src/interfaces/paginated-response.interface";
import CuisineStyleCard from "@/src/components/home/cuisine-style-card";
import {
  decodeAccessToken,
  getStoredAccessToken,
} from "@/src/services/auth.service";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useUser } from "@/src/context/user-context";

const Home = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [cuisineStyles, setCuisineStyles] =
    useState<IPaginatedResponse<ICuisineStyle>>();
  const [trending, setTrending] =
    useState<IPaginatedResponse<IRecipeResponse>>();
  const [recipeByCuisineStyle, setRecipeByCuisineStyle] =
    useState<IPaginatedResponse<IRecipeResponse>>();
  const [cuisineStyleFocused, setCuisineStyleFocused] = useState("");

  const router = useRouter();

  const handleInputFocus = () => {
    console.log("Input focused");
    router.push("/search");
  };

  useEffect(() => {
    getCuisineStyles().then((data) => {
      setCuisineStyles(data);
    });
    getTrendingecipes().then((data) => {
      setTrending(data);
    });
    getRecipesByCuisineStyle(cuisineStyleFocused).then((data) => {
      setRecipeByCuisineStyle(data);
    });
  }, []);

  const handleCuisineStylePress = (cuisineStyle: string) => {
    setCuisineStyleFocused(cuisineStyle);
    getRecipesByCuisineStyle(cuisineStyle).then((data) => {
      setRecipeByCuisineStyle(data);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles(theme).container}>
      <Header onFocus={handleInputFocus} />

      <View style={styles(theme).trendingContainer}>
        <View style={styles(theme).textTrendWrapper}>
          <Text style={styles(theme).trendingText}>Em alta</Text>
          <Text style={styles(theme).textColored}>Ver Todas</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).trendingContainerWrapper}
        >
          {trending &&
            trending.data.map((recipe, index) => (
              <TrendinCard
                key={recipe.id}
                imgUrl={recipe.imgUrl}
                title={recipe.name}
                time={recipe.totalTime?.toString()}
                onLikePress={() => console.log("Like")}
              />
            ))}
        </ScrollView>
      </View>

      {/* Categorias Populares */}
      <View style={styles(theme).trendingContainer}>
        <View style={styles(theme).textTrendWrapper}>
          <Text style={styles(theme).trendingText}>Categorias Populares</Text>
          <Text style={styles(theme).textColored}>Ver Todas</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).scrollContainer}
        >
          {cuisineStyles &&
            cuisineStyles.data.map((item, index) => (
              <Text
                key={index}
                style={[
                  styles(theme).categoryText,
                  cuisineStyleFocused === item.name
                    ? { color: theme.foreground }
                    : {},
                ]}
                onPress={() => handleCuisineStylePress(item.name)}
              >
                {item.name}
              </Text>
            ))}
        </ScrollView>
      </View>

      <View style={styles(theme).trendingContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).categoryContainerwrapper}
        >
          {recipeByCuisineStyle &&
            recipeByCuisineStyle.data.map((item, index) => (
              <CuisineStyleCard
                key={item.id}
                imgUrl={item.imgUrl}
                name={item.name}
                time={item.totalTime?.toString()}
                onLikePress={() => console.log("Like")}
                onPress={() => router.push(`/recipe/${item.id}`)}
                author={item.user.name}
              />
            ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Home;
function getTrendingRecipes() {
  throw new Error("Function not implemented.");
}
