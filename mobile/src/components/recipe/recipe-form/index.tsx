import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomPicker from "../../custom-picker";
import IngredintsCard from "../ingredients-card";
import PrimaryButton from "../../shared/primary-button";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import RecipeInstructions from "../recipe-instructions";
import CustomInput from "../../shared/custom-input";
import InversePrimaryButtonSlim from "../../shared/inverse-primary-button-slim";
import { updateAndValidate } from "@/src/utils/forms";
import { createRecipe } from "@/src/services/recipe.service";
import { all } from "axios";

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

const RecipeForm = ({ imgUrl }: RecipeFormProps) => {
  const { theme } = useTheme();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [partialDirections, setPartialDirections] = useState<Directions[]>([]);

  const [ingredientsFormData, setIngredientsFormData] = useState<
    Record<string, FormField>
  >({
    ingredient: {
      value: "",
      id: "ingredient",
      name: "ingredient",
      type: "default",
      placeholder: "Ingrediente",
      validation: (value: string) => value.length > 0,
      message: "O ingrediente não pode ser vazio",
    },
    quantity: {
      value: "",
      id: "quantity",
      name: "quantity",
      type: "numeric",
      placeholder: "Quantidade",
      validation: (value: string) => value.length > 0,
      message: "A quantidade não pode ser vazia",
    },
    unity: {
      value: "",
      id: "unity",
      name: "unity",
      type: "default",
      placeholder: "Unidade",
      validation: (value: string) => value.length > 0,
      message: "A unidade não pode ser vazia",
    },
  });

  const [directionsFormData, setDirectionsFormData] = useState<
    Record<string, FormField>
  >({
    step: {
      value: "",
      id: "step",
      name: "step",
      type: "default",
      placeholder: "Passo",
      validation: (value: string) => value.length > 0,
      message: "O passo não pode ser vazio",
    },
    title: {
      value: "",
      id: "title",
      name: "title",
      type: "default",
      placeholder: "Título",
      validation: (value: string) => value.length > 0,
      message: "O título não pode ser vazio",
    },
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "default",
      placeholder: "Descrição",
      validation: (value: string) => value.length > 0,
      message: "A descrição não pode ser vazia",
    },
  });

  const [macronutrientsFormData, setMacronutrientsFormData] = useState<
    Record<string, FormField>
  >({
    fat: {
      value: "",
      id: "fat",
      name: "fat",
      type: "numeric",
      placeholder: "Gordura",
      validation: (value: string) => value.length > 0,
      message: "A gordura não pode ser vazia",
    },
    protein: {
      value: "",
      id: "protein",
      name: "protein",
      type: "numeric",
      placeholder: "Proteína",
      validation: (value: string) => value.length > 0,
      message: "A proteína não pode ser vazia",
    },
    carbohydrate: {
      value: "",
      id: "carbohydrate",
      name: "carbohydrate",
      type: "numeric",
      placeholder: "Carboidrato",
      validation: (value: string) => value.length > 0,
      message: "O carboidrato não pode ser vazio",
    },
  });

  const [genericFormData, setGenericFormData] = useState<
    Record<string, FormField>
  >({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "default",
      placeholder: "Nome da Receita",
      validation: (value: string) => value.length > 2,
      message: "O nome deve ter no mínimo 3 caracteres",
    },
    type: {
      value: "",
      id: "type",
      name: "type",
      type: "default",
      placeholder: "Tipo (ex.: Sobremesa, Jantar)",
      validation: (value: string) => value.length > 2,
      message: "O tipo deve ter no mínimo 3 caracteres",
    },
    totalTime: {
      value: "",
      id: "totalTime",
      name: "totalTime",
      type: "numeric",
      placeholder: "Tempo de preparo",
      validation: (value: string) => value.length > 0,
      message: "O tempo total não pode ser vazio",
    },
    servingCount: {
      value: "",
      id: "servingCount",
      name: "servingCount",
      type: "numeric",
      placeholder: "Porções",
      validation: (value: string) => value.length > 0,
      message: "O número de porções não pode ser vazio",
    },
    costEstimate: {
      value: "",
      id: "costEstimate",
      name: "costEstimate",
      type: "numeric",
      placeholder: "custo estimado",
      validation: (value: string) => value.length > 0,
      message: "O número de porções não pode ser vazio",
    },
    allergens: {
      value: "",
      id: "allergens",
      name: "allergens",
      type: "numeric",
      placeholder: "Alergênicos",
      validation: (value: string) => value.length > 0,
      message: "O número de porções não pode ser vazio",
    },
    adictionalTips: {
      value: "",
      id: "adictionalTips",
      name: "adictionalTips",
      type: "default",
      placeholder: "Dicas Adicionais",
      validation: (value: string) => value.length > 0,
      message: "As dicas adicionais não podem ser vazias",
    },
  });

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
  };

  const handleIngredientsInputChange = (value: string, fieldName: string) => {
    setIngredientsFormData(
      updateAndValidate(ingredientsFormData, fieldName, value)
    );
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

  return (
    <ScrollView contentContainerStyle={styles(theme).formContainer}>
      {Object.entries(genericFormData).map(([key, field]) => (
        <CustomInput
          key={field.name}
          label={field.placeholder}
          placeholder={field.placeholder}
          keyboardType={field.type}
          value={field.value}
          onChangeText={(text) => handleGenericInputChange(text, field.name)}
        />
      ))}

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
              onChangeText={(text) =>
                handleIngredientsInputChange(text, field.name)
              }
            />
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

      <InversePrimaryButtonSlim
        text="Adicionar Ingrediente"
        onPress={addIngredient}
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
