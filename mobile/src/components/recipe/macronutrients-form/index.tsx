import React, { useState, useEffect } from "react";
import { View } from "react-native";
import CustomInput from "../../shared/custom-input";
import {
  FormField,
  macronutrientsInputs,
} from "@/src/static/register-form-inputs";
import { toValues, updateAndValidate } from "@/src/utils/forms";

type MacronutrientFormProps = {
  onMacronutrientsAdd: (macronutrients: {
    carbs: number;
    protein: number;
    fat: number;
  }) => void;
};

const MacronutrientsForm = ({
  onMacronutrientsAdd,
}: MacronutrientFormProps) => {
  const [macronutrientsFormData, setMacronutrientsFormData] =
    useState<Record<string, FormField>>(macronutrientsInputs);

  useEffect(() => {
    const macronutrients = toValues(macronutrientsFormData);
    onMacronutrientsAdd(macronutrients);
  }, [macronutrientsFormData]);

  const handleInputChange = (value: string, fieldName: string) => {
    setMacronutrientsFormData(
      updateAndValidate(macronutrientsFormData, fieldName, value)
    );
  };

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
