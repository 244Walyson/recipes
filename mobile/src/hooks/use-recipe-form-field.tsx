import { useEffect, useState } from "react";
import { FormField } from "@/src/static/register-form-inputs";
import { useRecipeRequestContext } from "../context/recipe-request-context";

const useFormFieldsFromContext = (formFields: Record<string, FormField>) => {
  const [formData, setFormData] =
    useState<Record<string, FormField>>(formFields);
  const { recipeRequest } = useRecipeRequestContext();

  useEffect(() => {
    const updatedFormData = { ...formData };

    console.log("here");

    Object.entries(updatedFormData).forEach(([key, field]) => {
      if (recipeRequest.macronutrients && key in recipeRequest.macronutrients) {
        const macronutrientValue =
          recipeRequest.macronutrients[
            key as keyof typeof recipeRequest.macronutrients
          ];
        console.log("macronutrientValue", macronutrientValue);
        if (macronutrientValue !== undefined) {
          updatedFormData[key].value = String(macronutrientValue);
        }
        setFormData(updatedFormData);
        return;
      }

      if (key in recipeRequest) {
        updatedFormData[key].value = String(
          recipeRequest[key as keyof typeof recipeRequest] || ""
        );
        setFormData(updatedFormData);
      }
    });
  }, [recipeRequest]);

  return formData;
};

export default useFormFieldsFromContext;
