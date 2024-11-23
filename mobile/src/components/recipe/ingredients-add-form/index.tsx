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
} from "@/src/static/register-form-inputs";
import { updateAndValidate } from "@/src/utils/forms";
import CustomPicker from "../../custom-picker";
import CustomInput from "../../shared/custom-input";
import PrimaryButtonSlim from "../../shared/primary-button-slim";
import IngredintsCard from "../ingredients-card";
import CustomModal from "../../shared/modal";
import ErrorContainer from "../../shared/error-container";
import LoadingContainer from "../../shared/loading-container";
import SuccessContainer from "../../shared/error-container copy";
import SuggestionItem from "../suggestion-item";
import { useRecipeRequestContext } from "@/src/context/recipe-request-context";
import useFormFieldsFromContext from "@/src/hooks/use-recipe-form-field";

const IngredisAddForm = () => {
  const { theme } = useTheme();
  const { recipeRequest, updateRecipeRequest } = useRecipeRequestContext();
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
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
    const { id, ingredient, quantity, unit } = ingredientsFormData;
    if (!id.value) {
      setModalVisible(true);
      console.log("modal");
      return;
    }
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      {
        id: id.value,
        name: ingredient.value,
        quantity: parseFloat(quantity.value),
        unit: unit.value,
      },
    ]);
    setIngredientsFormData({
      ...ingredientsFormData,
      id: { ...id, value: "" },
      ingredient: { ...ingredient, value: "" },
      quantity: { ...quantity, value: "" },
      unit: { ...unit, value: "ml" },
    });
  };

  useEffect(() => {
    setIngredients(recipeRequest.ingredients);
  }, [recipeRequest]);

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
    if (fieldName === "ingredient") {
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
    setIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item.id !== ingredient.id)
    );
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
      ingredientsFormData.ingredient.value &&
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
      {loading && <LoadingContainer />}

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

            {ingredientsSuggestions.length > 0 &&
              ingredientsSuggestions.map((ingredient) => (
                <SuggestionItem
                  key={`ingredient-${ingredient.name}`}
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
                  values={["ml", "litros", "xícaras"]}
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

      {ingredients.length > 0 &&
        ingredients.map((ingredient, index) => (
          <View style={{ marginTop: 5 }}>
            <IngredintsCard
              key={`ingredient-${ingredient.name}-${index}`}
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
              name: ingredientsFormData.ingredient.value,
              id: "",
            },
          ]}
          title={"Ingrediente não encontrado! Criar novo?"}
          btnApplyActive={true}
          btnApplyText="Criar"
          selectItemsOnOpen={true}
          loading={loading}
          btnApplyAction={() =>
            createNewIngredient(ingredientsFormData.ingredient.value)
          }
        />
      )}
    </View>
  );
};

export default IngredisAddForm;
