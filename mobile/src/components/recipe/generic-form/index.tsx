import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme } from "@/src/context/theme-context";
import { FormField, genericInputs } from "@/src/static/register-form-inputs";
import { updateAndValidate } from "@/src/utils/forms";
import CustomInput from "../../shared/custom-input";
import { useRecipeRequestContext } from "@/src/context/recipe-request-context";
import useFormFieldsFromContext from "@/src/hooks/use-recipe-form-field";

const GenericRecipeForm = () => {
  const { recipeRequest, updateRecipeRequest } = useRecipeRequestContext();
  const [generic, setGeneric] = useState<Record<string, any>>({});
  const formFields = useFormFieldsFromContext(genericInputs);
  const [genericFormData, setGenericFormData] =
    useState<Record<string, FormField>>(formFields);

  const handleGenericInputChange = (value: string, fieldName: string) => {
    setGenericFormData(updateAndValidate(genericFormData, fieldName, value));
    setGeneric((prevGeneric) => ({
      ...prevGeneric,
      [fieldName]: value,
    }));
    setGeneric((prevGeneric) => ({
      ...prevGeneric,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    updateRecipeRequest({
      ...recipeRequest,
      ...generic,
    });
  }, [generic]);

  return (
    <View>
      {Object.entries(genericFormData).map(([key, field]) => (
        <CustomInput
          key={field.name}
          label={field.placeholder}
          placeholder={field.placeholder}
          keyboardType={field.type}
          invalid={field.invalid === "true" && field.dirty === "true"}
          value={field.value}
          onChangeText={(text) => handleGenericInputChange(text, field.name)}
        />
      ))}
    </View>
  );
};

export default GenericRecipeForm;
