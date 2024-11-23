import { useEffect, useState } from "react";
import { FormField } from "@/src/static/register-form-inputs";
import { useRecipeRequestContext } from "../context/recipe-request-context";

const useFormFieldsFromContext = (formFields: Record<string, FormField>) => {
  const [formData, setFormData] =
    useState<Record<string, FormField>>(formFields);
  const { recipeRequest } = useRecipeRequestContext();

  useEffect(() => {
    const updatedFormData = { ...formData };

    Object.entries(updatedFormData).forEach(([key, field]) => {
      if (key in recipeRequest) {
        updatedFormData[key].value = String(
          recipeRequest[key as keyof typeof recipeRequest] || ""
        );
      }
    });

    setFormData(updatedFormData);
  }, [recipeRequest]);

  return formData;
};

export default useFormFieldsFromContext;
