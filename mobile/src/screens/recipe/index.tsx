import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  Animated,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import HeaderSecondary from "@/src/components/shared/header-secondary";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";
import RecipeInstructions from "@/src/components/recipe/recipe-instructions";
import DescriptionContainer from "@/src/components/recipe/description-container";
import { IRecipeResponse } from "@/src/interfaces/recipe/recipe-response.interface";
import {
  deleteRecipe,
  getRecipeById,
  viewRecipe,
} from "@/src/services/recipe.service";
import IngredientsCard from "@/src/components/recipe/ingredients-card";
import { IIngredient } from "@/src/interfaces/ingredient/ingredient.interface";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getStoredUserID } from "@/src/services/user.service";
import AuthorCard from "@/src/components/recipe/author-card";
import PrimaryButtonSlim from "@/src/components/shared/primary-button-slim";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomModal from "@/src/components/shared/modal";

type InstructionStep = {
  step: number;
  title: string;
  description: string;
};

const H_MAX_HEIGHT = 280;
const H_MIN_HEIGHT = 60;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const Recipe = () => {
  const [focusedBtn, setFocusedBtn] = React.useState("ingredients");
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isRecipeOwner, setIsRecipeOwner] = useState(false);
  const [recipe, setRecipe] = React.useState<IRecipeResponse>();
  const [refreshing, setRefreshing] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [0, -H_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  useEffect(() => {
    getRecipeById(id)
      .then((response) => {
        setRecipe(response);
        setRefreshing(false);
        console.log(response);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [refreshing, id, recipe?.user.id]);

  useEffect(() => {
    if (recipe) {
      getStoredUserID().then((userId) => {
        if (recipe.user.id === userId) {
          setIsRecipeOwner(true);
          return;
        }
        setIsRecipeOwner(false);
      });
    }

    if (recipe && !recipe?.isViewed) {
      viewRecipe(recipe.id);
    }
  }, [recipe]);

  const handleEditRecipe = () => {
    if (isRecipeOwner) {
      router.push(`/(tabs)/recipes/edit/${recipe?.id}`);
    }
  };

  const handleDeleteRecipe = () => {
    if (isRecipeOwner && recipe) {
      deleteRecipe(recipe?.id).then(() => {
        setModalVisible(false);
        router.replace(`/(tabs)/home`);
      });
    }
  };

  return (
    <View style={styles(theme).container}>
      <StatusBar translucent backgroundColor="transparent" />
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
        <ImageBackground
          source={{ uri: recipe?.imgUrl }}
          style={[styles(theme).image, { height: H_MAX_HEIGHT }]}
        >
          <HeaderSecondary
            title="Receita"
            ioniconLeftName="arrow-left"
            ioniconRightName={isRecipeOwner ? "square-edit-outline" : ""}
            colorEmphasis={recipe?.imgUrl ? "#fff" : theme.foreground}
            onPressLeft={() => router.back()}
            onPressRight={() => handleEditRecipe()}
          />
        </ImageBackground>
      </Animated.View>
      <ScrollView
        style={[
          styles(theme).instructionsContainer,
          { paddingTop: H_MAX_HEIGHT + 20 },
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
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
        {recipe && (
          <View style={{ gap: 16 }}>
            <DescriptionContainer
              title={recipe.name}
              time={recipe.preparationTime?.toString()}
              mealType={
                recipe.mealTypes && recipe.mealTypes.length > 0
                  ? recipe.mealTypes[0].name
                  : undefined
              }
              favourite={recipe.isFavorite || false}
              recipeId={recipe.id}
              favouriteCount={recipe.favoriteCount}
            />
            <AuthorCard
              name={recipe.user.name}
              avatarUrl={recipe.user.imgUrl}
              recipeCount={recipe.user.numberOfRecipes}
              userId={recipe.user.id}
            />
          </View>
        )}

        <View style={styles(theme).btnWrapper}>
          <PrimaryButtonSlim
            text="Ingredientes"
            onPress={() => setFocusedBtn("ingredients")}
            isActive={focusedBtn === "ingredients"}
          />
          <PrimaryButtonSlim
            text="modo de preparo"
            onPress={() => setFocusedBtn("modo de preparo")}
            isActive={focusedBtn != "ingredients"}
          />
        </View>

        <View style={{ marginBottom: H_MAX_HEIGHT + 130 }}>
          {focusedBtn !== "ingredients" ? (
            <RecipeInstructions data={recipe?.preparationMethod} />
          ) : (
            <View style={{ gap: 5 }}>
              {recipe?.recipeIngredients?.map((ingredient: IIngredient) => (
                <IngredientsCard
                  key={ingredient.id}
                  name={ingredient.name}
                  quantity={ingredient.quantity}
                  unit={ingredient.unit}
                  editing={false}
                  onDelete={() => {}}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      {isRecipeOwner && (
        <>
          <TouchableOpacity
            style={styles(theme).delete}
            onPress={() => setModalVisible(true)}
          >
            <MaterialComunityIcons name="delete" size={30} color={"#fff"} />
          </TouchableOpacity>
          <CustomModal
            title="Tem Certeza que deseja excluir essa receita?"
            data={[]}
            btnApplyActive={true}
            btnApplyText="Confirmar"
            btnApplyAwaysActive={true}
            btnApplyAction={() => handleDeleteRecipe()}
            onClose={() => setModalVisible(false)}
            visible={modalVisible}
          />
        </>
      )}
    </View>
  );
};

export default Recipe;
