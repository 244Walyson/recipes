import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import { IIngredient } from "@/src/interfaces/ingredient/ingredient.interface";
import {
  createIngredient,
  getIngredients,
} from "@/src/services/ingredient.service";
import {
  FormField,
  ingredientsInputs,
  unitInputs,
} from "@/src/static/register-form-inputs";
import { toValues, updateAndValidate } from "@/src/utils/forms";
import CustomPicker from "../../custom-picker";
import CustomInput from "../../shared/custom-input";
import PrimaryButtonSlim from "../../shared/primary-button-slim";
import IngredintsCard from "../ingredients-card";
import CustomModal from "../../shared/modal";
import ErrorContainer from "../../shared/error-container";
import SuccessContainer from "../../shared/error-container copy";
import SuggestionItem from "../suggestion-item";
import { useRecipeRequestContext } from "@/src/context/recipe-request-context";

const IngredisAddForm = () => {
  const { theme } = useTheme();
  const { recipeRequest, updateRecipeRequest } = useRecipeRequestContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [ingredientsSuggestions, setIngredientsSuggestions] = useState<
    IIngredient[]
  >([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [ingredientsFormData, setIngredientsFormData] =
    useState<Record<string, FormField>>(ingredientsInputs);

  const addIngredient = () => {
    const { id, name, quantity, unit } = ingredientsFormData;
    if (!id.value) {
      setModalVisible(true);
      return;
    }

    const updatedIngredients = [
      ...recipeRequest.ingredients,
      toValues(ingredientsFormData),
    ];
    updateRecipeRequest({ ...recipeRequest, ingredients: updatedIngredients });
    setIngredientsFormData({
      ...ingredientsFormData,
      id: { ...id, value: "" },
      name: { ...name, value: "" },
      quantity: { ...quantity, value: "" },
      unit: { ...unit, value: "ml" },
    });
  };

  const handleSelectedIngredient = (ingredient: IIngredient) => {
    const updatedFormData = {
      ...ingredientsFormData,
      id: { ...ingredientsFormData.id, value: ingredient.id },
      ingredient: { ...ingredientsFormData.ingredient, value: ingredient.name },
    };

    setIngredientsFormData(updatedFormData);
    setIngredientsSuggestions([]);
  };

  const handleIngredientsInputChange = (value: string, fieldName: string) => {
    setIngredientsFormData({
      ...updateAndValidate(ingredientsFormData, fieldName, value),
    });
    if (fieldName === "name") {
      handleSearch(value);
    }
    if (value === "") {
      setIngredientsSuggestions([]);
    }
  };

  const handleSearch = (text: string) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const newTimeout = setTimeout(async () => {
      if (text) {
        getIngredients(text)
          .then((response) => {
            setIngredientsSuggestions(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  const handleRemoveIngredient = (ingredient: IIngredient) => {
    const updatedIngredients = recipeRequest.ingredients.filter((item) => {
      return item.id !== ingredient.id;
    });
    updateRecipeRequest({ ...recipeRequest, ingredients: updatedIngredients });
  };

  const createNewIngredient = (name: string) => {
    setLoading(true);
    createIngredient(name)
      .then((response) => {
        setIngredientsFormData((prevIngredients) => ({
          ...prevIngredients,
          id: { ...prevIngredients.id, value: response.id },
        }));
        addIngredient();
        setLoading(false);
        setModalVisible(false);
        setSuccess(true);
      })
      .catch((error) => {
        setError("Erro ao criar novo ingrediente");
        setModalVisible(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess(false);
    }, 3000);
  }, [success, error]);

  useEffect(() => {
    if (
      ingredientsFormData.id.value &&
      ingredientsFormData.name.value &&
      ingredientsFormData.quantity.value &&
      ingredientsFormData.unit.value
    ) {
      addIngredient();
    }
  }, [ingredientsFormData.id.value]);

  return (
    <View style={styles(theme).container}>
      {!!error && <ErrorContainer error={error} />}
      {success && (
        <SuccessContainer message="Ingrediente criado com sucesso!" />
      )}

      {Object.entries(ingredientsFormData).map(([key, field]) =>
        key === "name" ? (
          <View style={{ marginTop: 20 }} key={key}>
            <CustomInput
              key={field.name}
              placeholder={field.placeholder}
              keyboardType={field.type}
              label={field.placeholder}
              value={field.value}
              onChangeText={(text) =>
                handleIngredientsInputChange(text, field.name)
              }
            />

            {ingredientsSuggestions.length > 0 &&
              ingredientsSuggestions.map((ingredient) => (
                <SuggestionItem
                  key={ingredient.id}
                  data={{ id: ingredient.id, text: ingredient.name }}
                  onPress={() => handleSelectedIngredient(ingredient)}
                />
              ))}
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
                  key="unit-picker"
                  values={unitInputs}
                  onChange={(value) =>
                    handleIngredientsInputChange(value, "unit")
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

      {recipeRequest.ingredients.length > 0 &&
        recipeRequest.ingredients.map((ingredient, index) => (
          <View key={ingredient.id} style={{ marginTop: 5 }}>
            <IngredintsCard
              key={ingredient.id}
              name={ingredient.name}
              quantity={ingredient.quantity}
              unit={ingredient.unit}
              editing={true}
              onDelete={() => handleRemoveIngredient(ingredient)}
            />
          </View>
        ))}

      {modalVisible && (
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          data={[
            {
              name: ingredientsFormData.name.value,
              id: "",
            },
          ]}
          title={"Ingrediente não encontrado! Criar novo?"}
          btnApplyActive={true}
          btnApplyText="Criar"
          selectItemsOnOpen={true}
          loading={loading}
          btnApplyAction={() =>
            createNewIngredient(ingredientsFormData.name.value)
          }
        />
      )}
    </View>
  );
};

export default IngredisAddForm;
