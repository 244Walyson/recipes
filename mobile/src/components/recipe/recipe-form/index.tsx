import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomPicker from "../../custom-picker";
import IngredintsCard from "../ingredients-card";
import PrimaryButton from "../../shared/primary-button";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import RecipeInstructions from "../recipe-instructions";
import CustomInput from "../../shared/custom-input";
import { updateAndValidate } from "@/src/utils/forms";
import { createRecipe } from "@/src/services/recipe.service";
import { all } from "axios";
import CustomModal from "../../shared/modal";
import PrimaryButtonSlim from "../../shared/primary-button-slim";
import {
  directionsInputs,
  genericInputs,
  ingredientsInputs,
  macronutrientsInputs,
} from "@/src/static/register-form-inputs";

type Ingredient = {
  name: string;
  quantity: number;
  unity: string;
};

type Directions = {
  step: number;
  title: string;
  description: string;
};

type FormField = {
  value: string;
  id: string;
  name: string;
  type: "default" | "numeric" | "email-address" | "phone-pad";
  placeholder: string;
  validation: (value: string) => {};
  message: string;
};

type RecipeFormProps = {
  imgUrl?: string;
};

const dataS = [
  "Apple",
  "Banana",
  "Orange",
  "Pineapple",
  "Mango",
  "Strawberry",
  "Blueberry",
  "Raspberry",
];

const RecipeForm = ({ imgUrl }: RecipeFormProps) => {
  const { theme } = useTheme();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [partialDirections, setPartialDirections] = useState<Directions[]>([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [ingredientsFormData, setIngredientsFormData] =
    useState<Record<string, FormField>>(ingredientsInputs);

  const [directionsFormData, setDirectionsFormData] =
    useState<Record<string, FormField>>(directionsInputs);

  const [macronutrientsFormData, setMacronutrientsFormData] =
    useState<Record<string, FormField>>(macronutrientsInputs);

  const [genericFormData, setGenericFormData] =
    useState<Record<string, FormField>>(genericInputs);

  const addIngredient = () => {
    console.log("Adicionar Ingrediente", ingredientsFormData);
    const { ingredient, quantity, unity } = ingredientsFormData;
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      {
        name: ingredient.value,
        quantity: Number(quantity.value),
        unity: unity.value,
      },
    ]);
    setIngredientsFormData({
      ...ingredientsFormData,
      ingredient: { ...ingredient, value: "" },
      quantity: { ...quantity, value: "" },
      unity: { ...unity, value: "ml" },
    });
  };

  const handleMacronutrientsInputChange = (
    value: string,
    fieldName: string
  ) => {
    setMacronutrientsFormData(
      updateAndValidate(macronutrientsFormData, fieldName, value)
    );
  };

  const handleGenericInputChange = (value: string, fieldName: string) => {
    setGenericFormData(updateAndValidate(genericFormData, fieldName, value));
    handleSearch(value);
  };

  const handleIngredientsInputChange = (value: string, fieldName: string) => {
    setIngredientsFormData(
      updateAndValidate(ingredientsFormData, fieldName, value)
    );
    handleSearch(value);
  };

  const handleDirectionsInputChange = (value: string, fieldName: string) => {
    setDirectionsFormData(
      updateAndValidate(directionsFormData, fieldName, value)
    );
  };

  const handlePartialDirections = (field: string) => {
    if (field === "description") {
      setPartialDirections((prevDirections) => {
        const lastIndex = prevDirections.length - 1;
        if (lastIndex >= 0) {
          const updatedDirections = [...prevDirections];
          const updatedDescription = `${updatedDirections[lastIndex].description} \n • ${directionsFormData.description.value}`;
          updatedDirections[lastIndex] = {
            ...updatedDirections[lastIndex],
            description: updatedDescription,
          };
          return updatedDirections;
        }
        return prevDirections;
      });
    } else if (field === "title") {
      setPartialDirections((prevDirections) => [
        ...prevDirections,
        {
          step: prevDirections.length + 1,
          title: `• ${directionsFormData.title.value}`,
          description: "",
        },
      ]);
    }
  };

  const handleSaveRecipe = async () => {
    const macronutrients = {
      carbs: Number(macronutrientsFormData.carbohydrate?.value) || 0,
      fat: Number(macronutrientsFormData.fat?.value) || 0,
      protein: Number(macronutrientsFormData.protein?.value) || 0,
    };

    const genericdata = {
      name: genericFormData.name.value,
      type: genericFormData.type.value,
      totalTime: genericFormData.totalTime.value,
      preparationTime: Number(genericFormData.preparationTime?.value) || 0, // Aqui convertemos para número
      servingCount: Number(genericFormData.servingCount.value),
      adictionalTips: genericFormData.adictionalTips.value,
      allergens: Array.isArray(genericFormData.allergens?.value)
        ? genericFormData.allergens.value
        : [genericFormData.allergens?.value], // Ensure allergens is an array
      costEstimate: Number(genericFormData.costEstimate.value),
    };

    const ingredientsData = ingredients.map((ingredient, index) => ({
      id: "",
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unity,
    }));

    const preparationMethod = partialDirections.map((direction) => ({
      step: direction.step,
      title: direction.title,
      description: direction.description,
    }));

    const data = {
      imgUrl: imgUrl,
      ...genericdata,
      ingredients: ingredientsData,
      preparationMethod: preparationMethod,
      macronutrients: macronutrients,
      isPublished: true,
      mealTypes: [],
      cuisineStyles: [],
    };

    console.log(data);
    await createRecipe(data);
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text) {
      const filteredSuggestions = dataS.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      return;
    }
    setSuggestions([]);
  };

  return (
    <ScrollView contentContainerStyle={styles(theme).formContainer}>
      {Object.entries(genericFormData).map(([key, field]) =>
        key === "type" ? (
          <View>
            <CustomInput
              key={field.name}
              label={field.placeholder}
              placeholder={field.placeholder}
              keyboardType={field.type}
              value={field.value}
              onChangeText={(text) =>
                handleGenericInputChange(text, field.name)
              }
            />
            {suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                renderItem={({ item }) => (
                  <Text
                    style={styles(theme).suggestion}
                    onPress={() => handleGenericInputChange(item, "type")}
                  >
                    {item}
                  </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        ) : (
          <CustomInput
            key={field.name}
            label={field.placeholder}
            placeholder={field.placeholder}
            keyboardType={field.type}
            value={field.value}
            onChangeText={(text) => handleGenericInputChange(text, field.name)}
          />
        )
      )}

      <View
        style={[
          {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          },
        ]}
      >
        {Object.entries(macronutrientsFormData).map(([key, field]) => (
          <View style={{ width: "30%" }}>
            <CustomInput
              key={field.name}
              label={field.placeholder}
              placeholder={field.placeholder}
              keyboardType={field.type}
              value={field.value}
              onChangeText={(text) =>
                handleMacronutrientsInputChange(text, field.name)
              }
            />
          </View>
        ))}
      </View>

      {Object.entries(ingredientsFormData).map(([key, field]) =>
        key === "ingredient" ? (
          <View
            style={{ marginTop: 20 }}
            key={`ingredient-key-${field.placeholder}`}
          >
            <CustomInput
              key={`field.name-${field.name}`}
              placeholder={field.placeholder}
              keyboardType={field.type}
              label={field.placeholder}
              value={field.value}
              onFocus={() => handleSearch(field.value)}
              onChangeText={(text) =>
                handleIngredientsInputChange(text, field.name)
              }
            />

            {suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                renderItem={({ item }) => (
                  <Text
                    style={styles(theme).suggestion}
                    onPress={() =>
                      handleIngredientsInputChange(item, "ingredient")
                    }
                  >
                    {item}
                  </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        ) : (
          key === "quantity" && (
            <View
              style={styles(theme).inputWrapper}
              key={`quantity-${field.placeholder}`}
            >
              <View style={styles(theme).input}>
                <CustomInput
                  key={`field.name-${field.name}`}
                  placeholder={field.placeholder}
                  keyboardType={field.type}
                  value={field.value}
                  onChangeText={(text) =>
                    handleIngredientsInputChange(text, field.name)
                  }
                />
              </View>
              <View style={styles(theme).selectWrapper}>
                <CustomPicker
                  key="unity-picker"
                  values={["ml", "litros", "xícaras"]}
                  onChange={(value) =>
                    handleIngredientsInputChange(value, "unity")
                  }
                />
              </View>
            </View>
          )
        )
      )}

      <PrimaryButtonSlim
        text="Adicionar Ingrediente"
        onPress={addIngredient}
        isActive={false}
      />

      {ingredients.length > 0 &&
        ingredients.map((ingredient, index) => (
          <IngredintsCard
            key={`ingredient-${ingredient.name}-${index}`}
            name={ingredient.name}
            quantity={ingredient.quantity}
            unit={ingredient.unity}
            editing={true}
            onDelete={() => {}}
          />
        ))}

      <View style={styles(theme).directionsContainer}>
        <Text style={styles(theme).label}>Modo de Preparo</Text>
        <View>
          <Text style={styles(theme).textLight}>Descreva em etapas ex: </Text>
          <Text style={styles(theme).textStrong}>1. Preparar a massa</Text>
          <Text style={styles(theme).textLight}>
            {" "}
            • Em uma tijela adicione...
          </Text>
          <Text style={styles(theme).textLight}> • Adicione o açúcar...</Text>
        </View>

        {Object.entries(directionsFormData).map(([key, field]) => (
          <>
            {key === "title" && (
              <View style={styles(theme).inputWrapper} key="title">
                <View style={styles(theme).input}>
                  <CustomInput
                    key={`-${field.name}-key`}
                    placeholder={field.placeholder}
                    keyboardType={field.type}
                    onChangeText={(text) =>
                      handleDirectionsInputChange(text, field.name)
                    }
                  />
                </View>
                <TouchableOpacity
                  key={`-${field.name}-key`}
                  style={styles(theme).addWrapper}
                  onPress={() => handlePartialDirections("title")}
                >
                  <Ionicons
                    key={`-${field.name}-icon`}
                    name="checkmark"
                    size={30}
                    color={theme.background}
                  />
                </TouchableOpacity>
              </View>
            )}
            {key === "description" && (
              <View style={styles(theme).inputWrapper} key="description-key">
                <View style={styles(theme).input}>
                  <CustomInput
                    key={`field.name-key${field.name}`}
                    placeholder={field.placeholder}
                    keyboardType={field.type}
                    onChangeText={(text) =>
                      handleDirectionsInputChange(text, key)
                    }
                  />
                </View>
                <TouchableOpacity
                  style={styles(theme).addWrapper}
                  onPress={() => handlePartialDirections("description")}
                >
                  <Ionicons name="add" size={30} color={theme.background} />
                </TouchableOpacity>
              </View>
            )}
          </>
        ))}

        <RecipeInstructions data={partialDirections} />
      </View>

      <PrimaryButton text="Salvar Receita" onPress={handleSaveRecipe} />
    </ScrollView>
  );
};

export default RecipeForm;
