import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Header from "@/src/components/shared/header-primary";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import TrendinCard from "@/src/components/home/trending-card";
import { ICuisineStyle } from "@/src/interfaces/cuisine-style/cousine-styles.interface";
import { IRecipeResponse } from "@/src/interfaces/recipe/recipe-response.interface";
import { getRecipes, getTrendingecipes } from "@/src/services/recipe.service";
import { IPaginatedResponse } from "@/src/interfaces/paginated-response.interface";
import CuisineStyleCard from "@/src/components/home/meal-type-card";
import { getStoredUserID, getUser } from "@/src/services/user.service";
import { IUserResponse } from "@/src/interfaces/user/user-response.interface";
import MealTypeCard from "@/src/components/recipe/meal-type-card";
import { IFindAllFilters } from "@/src/interfaces/recipe/find-all-filters.interface";
import { getMealTypes } from "@/src/services/meal-type.service";

const Home = () => {
  const { theme } = useTheme();
  const [cuisineStyles, setCuisineStyles] =
    useState<IPaginatedResponse<ICuisineStyle>>();
  const [trending, setTrending] =
    useState<IPaginatedResponse<IRecipeResponse>>();
  const [recipeByMealType, setRecipeByMealType] =
    useState<IPaginatedResponse<IRecipeResponse>>();
  const [mealTypeFocused, setMealTypeFocused] = useState<string | undefined>(
    undefined
  );
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<IUserResponse>();

  const router = useRouter();

  useEffect(() => {
    getMealTypes("").then((data) => {
      setCuisineStyles(data);
    });
    const trendingFilter: IFindAllFilters = { orderBy: "favouriteCount" };
    getRecipes(trendingFilter).then((data) => {
      setTrending(data);
    });
    setMealTypeFocused(undefined);
    getStoredUserID().then((userId) => {
      if (userId) {
        getUser(userId).then((data) => {
          setUser(data);
        });
      }
    });
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    const mealTypeFilter: IFindAllFilters = {
      mealTypes: mealTypeFocused ? [mealTypeFocused] : [],
    };
    getRecipes(mealTypeFilter).then((data) => {
      console.log("mealType", data);
      setRecipeByMealType(data);
    });
  }, [mealTypeFocused]);

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
      <Header smallText="ola," bigText={user?.name} imgUrl={user?.imgUrl} />

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
              views={recipe.viewCount}
              difficultyLevel={recipe.difficultyLevel}
              onLikePress={() => console.log("Like")}
              onPress={() => router.push(`/recipes/${recipe.id}`)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles(theme).trendingContainer}>
        <View style={styles(theme).textTrendWrapper}>
          <Text style={styles(theme).trendingText}>Tipos de Refeição</Text>
          <Text style={styles(theme).textColored}>Ver Todas</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).scrollContainer}
        >
          {cuisineStyles?.data.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setMealTypeFocused(item.name)}
            >
              <MealTypeCard name={item.name} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles(theme).trendingContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).categoryContainerwrapper}
        >
          {recipeByMealType?.data.map((item, index) => (
            <CuisineStyleCard
              key={item.id}
              imgUrl={item.imgUrl}
              name={item.name}
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
