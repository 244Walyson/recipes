import React, { useState, useEffect } from "react";
import { View } from "react-native";
import CustomInput from "../../shared/custom-input";
import {
  FormField,
  macronutrientsInputs,
} from "@/src/static/register-form-inputs";
import { toValues, updateAndValidate } from "@/src/utils/forms";
import { useRecipeRequestContext } from "@/src/context/recipe-request-context";
import useFormFieldsFromContext from "@/src/hooks/use-recipe-form-field";

const MacronutrientsForm = () => {
  const { recipeRequest, updateRecipeRequest } = useRecipeRequestContext();
  const formFields = useFormFieldsFromContext(macronutrientsInputs);

  const [macronutrientsFormData, setMacronutrientsFormData] =
    useState<Record<string, FormField>>(formFields);

  const handleInputChange = (value: string, fieldName: string) => {
    setMacronutrientsFormData(
      updateAndValidate(macronutrientsFormData, fieldName, value)
    );
  };

  console.log("macronutrientsFormData");

  useEffect(() => {
    const formValues = toValues(macronutrientsFormData);
    console.log("formValuessMacro", formValues);
    updateRecipeRequest({
      ...recipeRequest,
      ...formValues,
    });
  }, [macronutrientsFormData]);

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {Object.entries(macronutrientsFormData).map(([key, field]) => (
        <View style={{ width: "30%" }} key={key}>
          <CustomInput
            label={field.placeholder}
            placeholder={field.placeholder}
            keyboardType={field.type}
            value={field.value}
            onChangeText={(text) => handleInputChange(text, field.name)}
          />
        </View>
      ))}
    </View>
  );
};

export default MacronutrientsForm;
