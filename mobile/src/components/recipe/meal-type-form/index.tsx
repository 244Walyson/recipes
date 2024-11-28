import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import CustomInput from "../../shared/custom-input";
import { useTheme } from "@/src/context/theme-context";
import { IMealType } from "@/src/interfaces/meal-type/meal-type.interface";
import { FormField, mealTypesInputs } from "@/src/static/register-form-inputs";
import { toValues, updateAndValidate } from "@/src/utils/forms";
import { createMealType, getMealTypes } from "@/src/services/meal-type.service";
import ErrorContainer from "../../shared/error-container";
import Feather from "react-native-vector-icons/Feather";
import { styles } from "./styles";
import CustomModal from "../../shared/modal";
import MealTypeCard from "../meal-type-card";
import SuggestionItem from "../suggestion-item";
import { useRecipeRequestContext } from "@/src/context/recipe-request-context";

const MealTypeForm = () => {
  const { theme } = useTheme();
  const { recipeRequest, updateRecipeRequest } = useRecipeRequestContext();
  const [mealTypes, setMealTypes] = useState<IMealType[]>(
    recipeRequest.mealTypes
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mealTypeSuggestions, setMealTypeSuggestions] = useState<IMealType[]>(
    []
  );
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [mealTypesFormData, setMealTypesFormData] =
    useState<Record<string, FormField>>(mealTypesInputs);

  const addMealType = () => {
    console.log("mealTypesFormData", mealTypesFormData);
    const { id, name } = mealTypesFormData;
    if (!id.value) {
      setModalVisible(true);
      return;
    }
    updateRecipeRequest({
      ...recipeRequest,
      mealTypes: [...mealTypes, toValues(mealTypesFormData)],
    });
    setMealTypesFormData({
      ...mealTypesFormData,
      id: { ...id, value: "" },
      name: { ...name, value: "" },
    });
    setMealTypeSuggestions([]);
  };

  const handleSelectedMealType = (mealType: IMealType) => {
    const updatedFormData = {
      ...mealTypesFormData,
      id: { ...mealTypesFormData.id, value: mealType.id },
      name: { ...mealTypesFormData.name, value: mealType.name },
    };

    setMealTypesFormData(updatedFormData);
    setMealTypeSuggestions([]);
  };

  const handleMealTypeInputChange = (text: string, field: string) => {
    setMealTypesFormData(updateAndValidate(mealTypesFormData, field, text));
    handleSearch(text);
    if (text === "") {
      setMealTypeSuggestions([]);
    }
  };

  const createNewMealType = (name: string) => {
    setLoading(true);
    createMealType(name)
      .then((response) => {
        const updatedMealTypes = {
          ...mealTypesFormData,
          id: { ...mealTypesFormData.id, value: response.id },
        };
        setMealTypesFormData(updatedMealTypes);
        setLoading(false);
        setModalVisible(false);
      })
      .catch((error) => {
        setError("Erro ao criar novo ingrediente");
        setModalVisible(false);
      });
  };

  const handleSearch = (text: string) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const newTimeout = setTimeout(async () => {
      if (text) {
        getMealTypes(text)
          .then((response) => {
            setMealTypeSuggestions(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  useEffect(() => {
    setMealTypes(recipeRequest.mealTypes);
  }, [recipeRequest]);

  return (
    <View>
      {!!error && <ErrorContainer error={error} />}

      {Object.entries(mealTypesFormData).map(
        ([key, field]) =>
          key === "name" && (
            <View style={styles(theme).inputWrapper} key="title">
              <View style={styles(theme).input}>
                <CustomInput
                  key={`-${field.name}-key`}
                  placeholder={field.placeholder}
                  keyboardType={field.type}
                  value={field.value}
                  onChangeText={(text) =>
                    handleMealTypeInputChange(text, field.name)
                  }
                />
              </View>
              <TouchableOpacity
                key={`-${field.name}-key`}
                style={styles(theme).addWrapper}
                onPress={() => addMealType()}
              >
                <Feather
                  key={`-${field.name}-icon`}
                  name="plus"
                  size={30}
                  color={theme.background}
                />
              </TouchableOpacity>
            </View>
          )
      )}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {mealTypes.length > 0 &&
          mealTypes.map((mealType) => (
            <MealTypeCard name={mealType.name} key={mealType.id} />
          ))}
      </View>

      {mealTypeSuggestions.length > 0 &&
        mealTypeSuggestions.map((mealType) => (
          <SuggestionItem
            key={mealType.id}
            data={{ id: mealType.id, text: mealType.name }}
            onPress={() => handleSelectedMealType(mealType)}
          />
        ))}
      {modalVisible && (
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          data={[
            {
              name: mealTypesFormData.name.value,
              id: "",
            },
          ]}
          title={"Tipo de refeição não encontrado! Criar novo?"}
          btnApplyActive={true}
          btnApplyText="Criar"
          selectItemsOnOpen={true}
          loading={loading}
          btnApplyAction={() => createNewMealType(mealTypesFormData.name.value)}
        />
      )}
    </View>
  );
};

export default MealTypeForm;
