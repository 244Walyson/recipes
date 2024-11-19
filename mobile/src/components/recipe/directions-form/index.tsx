import { useTheme } from "@/src/context/theme-context";
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../../shared/custom-input";
import RecipeInstructions from "../recipe-instructions";
import { styles } from "./styles";
import { directionsInputs, FormField } from "@/src/static/register-form-inputs";
import { updateAndValidate } from "@/src/utils/forms";

type Directions = {
  step: number;
  title: string;
  description: string;
};

type DirectionsFormProps = {
  onDirectionsAdd: (directions: Directions[]) => void;
};

const DirectionsForm = ({ onDirectionsAdd }: DirectionsFormProps) => {
  const { theme } = useTheme();
  const [partialDirections, setPartialDirections] = useState<Directions[]>([]);
  const [directionsFormData, setDirectionsFormData] =
    useState<Record<string, FormField>>(directionsInputs);

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
      onDirectionsAdd(partialDirections);
    }
    if (field === "title") {
      setPartialDirections((prevDirections) => [
        ...prevDirections,
        {
          step: prevDirections.length + 1,
          title: `• ${directionsFormData.title.value}`,
          description: "",
        },
      ]);
      onDirectionsAdd(partialDirections);
    }
  };

  return (
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
        <React.Fragment key={key}>
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
        </React.Fragment>
      ))}

      <RecipeInstructions data={partialDirections} />
    </View>
  );
};

export default DirectionsForm;
