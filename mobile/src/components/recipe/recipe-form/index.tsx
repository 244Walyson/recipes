import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomPicker from "../../custom-picker";
import IngredintsCard from "../ingredients-card";
import PrimaryButton from "../../shared/primary-button";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import FormInput from "../input";
import RecipeInstructions from "../recipe-instructions";
import CustomInput from "../../shared/custom-input";
import InversePrimaryButtonSlim from "../../shared/inverse-primary-button-slim";

type Ingredient = {
  name: string;
  quantity: number;
  unity: string;
};

type Directions = {
  step: number;
  description: string;
  topics: string;
};

type InstructionStep = {
  step: number;
  title: string;
  description: string;
};

const instructions: InstructionStep[] = [
  {
    step: 1,
    title: "Prepare the spice paste",
    description:
      "• In a recipient, combine garlic, ginger, and spices to make a thick paste.",
  },
  {
    step: 2,
    title: "Cook the chicken",
    description:
      "• Place the chicken in a pan with the spice paste and cook on medium heat until tender.",
  },
  {
    step: 3,
    title: "Prepare the spice paste",
    description:
      "• In a recipient, combine garlic, ginger, and spices to make a thick paste.",
  },
  {
    step: 4,
    title: "Cook the chicken",
    description:
      "• Place the chicken in a pan with the spice paste and cook on medium heat until tender.",
  },
  {
    step: 5,
    title: "Prepare the spice paste",
    description:
      "• In a recipient, combine garlic, ginger, and spices to make a thick paste.\n• In a recipient, combine garlic, ginger, and spices to make a thick paste.",
  },
  {
    step: 6,
    title: "Cook the chicken",
    description:
      "• Place the chicken in a pan with the spice paste and cook on medium heat until tender. \n• Place the chicken in a pan with the spice paste and cook on medium heat until tender.",
  },
];

const RecipeForm = () => {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unity, setUnity] = useState("ml");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState<string>("");
  const [directions, setDirections] = useState<Directions[]>([]);

  const addIngredient = () => {
    if (ingredientName && quantity && unity) {
      setIngredients([
        ...ingredients,
        { name: ingredientName, quantity: Number(quantity), unity },
      ]);
      setIngredientName("");
      setQuantity("");
      setUnity("");
    } else {
      console.log("Por favor, preencha todos os campos");
    }
  };

  const addStep = () => {
    if (instruction.trim()) {
      const newStep = {
        step,
        description: instruction,
        topics,
      };
      setDirections([...directions, newStep]);
      setStep(step + 1);
      setInstruction("");
      setTopic("");
      setTopics("");
    }
  };

  const addTopic = () => {
    if (topic.trim()) {
      const newTopic = topics + "\n" + topic;
      setTopics(newTopic);
      directions[directions.length - 1].topics = newTopic;
      setTopic("");
    }
  };

  const handleSaveRecipe = () => {
    console.log("Salvar Receita", { title, type, ingredients, directions });
  };

  return (
    <ScrollView contentContainerStyle={styles(theme).formContainer}>
      <CustomInput
        label="Nome da Receita"
        placeholder="Exemplo: Bolo de Cenoura"
        keyboardType="default"
        onChangeText={(text) => setTitle(text)}
      />

      <CustomInput
        label="Tipo"
        placeholder="Exemplo: Sobremesa, Jantar..."
        keyboardType="default"
        onChangeText={(text) => setTitle(text)}
      />

      <CustomInput
        label="Ingredientes"
        placeholder="Ingrediente"
        keyboardType="default"
        onChangeText={(text) => setTitle(text)}
      />

      <View style={styles(theme).inputWrapper}>
        <View style={styles(theme).input}>
          <CustomInput
            placeholder="quantidade"
            keyboardType="numeric"
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles(theme).selectWrapper}>
          <CustomPicker
            values={["ml", "litros", "xícaras"]}
            onChange={(value) => setUnity(value)}
          />
        </View>
      </View>

      <InversePrimaryButtonSlim
        text="Adicionar Ingrediente"
        onPress={addIngredient}
      />

      {ingredients.map((ingredient, index) => (
        <IngredintsCard
          key={index}
          name={ingredient.name}
          quantity={ingredient.quantity}
          unity={ingredient.unity}
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
          <Text style={styles(theme).textLight}> • Adicione o açucar...</Text>
        </View>
        <View style={styles(theme).inputWrapper}>
          <View style={styles(theme).input}>
            <CustomInput
              placeholder={step + ". Preparar a massa"}
              keyboardType="default"
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <TouchableOpacity style={styles(theme).addWrapper} onPress={addStep}>
            <Ionicons name="checkmark" size={30} color={theme.background} />
          </TouchableOpacity>
        </View>
        <View style={styles(theme).inputWrapper}>
          <View style={styles(theme).input}>
            <CustomInput
              placeholder={"• Em uma tijela adicione..."}
              keyboardType="default"
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <TouchableOpacity style={styles(theme).addWrapper} onPress={addTopic}>
            <Ionicons name="add" size={30} color={theme.background} />
          </TouchableOpacity>
        </View>

        <RecipeInstructions data={instructions} />
      </View>

      <PrimaryButton text="Salvar Receita" onPress={() => {}} />
    </ScrollView>
  );
};

export default RecipeForm;
