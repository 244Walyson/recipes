import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
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

const Home = () => {
  const { theme } = useTheme();
  const [cuisineStyles, setCuisineStyles] =
    useState<IPaginatedResponse<ICuisineStyle>>();
  const [trending, setTrending] =
    useState<IPaginatedResponse<IRecipeResponse>>();
  const [recipeByCuisineStyle, setRecipeByCuisineStyle] =
    useState<IPaginatedResponse<IRecipeResponse>>();
  const [cuisineStyleFocused, setCuisineStyleFocused] = useState("");
  const [refreshing, setRefreshing] = useState(false);

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
    setRefreshing(false);
  }, [refreshing]);

  const handleCuisineStylePress = (cuisineStyle: string) => {
    setCuisineStyleFocused(cuisineStyle);
    getRecipesByCuisineStyle(cuisineStyle).then((data) => {
      setRecipeByCuisineStyle(data);
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles(theme).container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
          colors={[theme.foreground]}
          tintColor="transparent"
          progressBackgroundColor="transparent"
        />
      }
    >
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
          {trending?.data.map((recipe) => (
            <TrendinCard
              key={recipe.id}
              imgUrl={recipe.imgUrl}
              title={recipe.name}
              time={recipe.preparationTime?.toString()}
              onLikePress={() => console.log("Like")}
              onPress={() => router.push(`/recipes/${recipe.id}`)}
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
          {cuisineStyles?.data.map((item) => (
            <Text
              key={item.id}
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
          {recipeByCuisineStyle?.data.map((item, index) => (
            <CuisineStyleCard
              key={item.id}
              imgUrl={item.imgUrl}
              name={item.name}
              time={item.preparationTime?.toString()}
              onLikePress={() => console.log("Like")}
              onPress={() => router.push(`/recipes/${item.id}`)}
              author={item.user.name}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Home;
